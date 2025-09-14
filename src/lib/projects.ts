import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";

export type ProjectFrontmatter = {
  slug: string;
  title: string;
  date?: string; // ISO date (optional)
  summary?: string;
  cover?: string; // path to image in public or remote URL
  tech?: string[];
  external?: string; // external link (repo/site)
};

export type Project = ProjectFrontmatter & { content: string };

const projectsDir = path.join(process.cwd(), "src", "content", "projects");

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDir)) return [];
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));
  const list = files.map((file) => {
    const full = path.join(projectsDir, file);
    const source = fs.readFileSync(full, "utf8");
    const { data, content } = matter(source);
    const fm = data as Partial<ProjectFrontmatter>;
    if (!fm.slug) fm.slug = file.replace(/\.mdx$/, "");
    if (!fm.title) fm.title = fm.slug!
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());
    return { ...(fm as ProjectFrontmatter), content } as Project;
  });
  return list.sort((a, b) => (a.date && b.date ? (a.date > b.date ? -1 : 1) : a.title.localeCompare(b.title)));
}

export function getProjectBySlug(slug: string): Project | null {
  const file = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const source = fs.readFileSync(file, "utf8");
  const { data, content } = matter(source);
  const fm = data as Partial<ProjectFrontmatter>;
  return {
    slug,
    title: fm.title ?? slug,
    date: fm.date,
    summary: fm.summary,
    cover: fm.cover,
    tech: fm.tech,
    external: fm.external,
    content,
  } as Project;
}

export async function renderProjectMDX(source: string) {
  const options: PrettyCodeOptions = {
    theme: { dark: "vitesse-dark", light: "vitesse-light" },
  };
  const { content } = await compileMDX<{ [key: string]: unknown }>({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, options]],
      },
      parseFrontmatter: false,
    },
    components: mdxComponents({}),
  });
  return content;
}
