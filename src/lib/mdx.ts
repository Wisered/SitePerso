import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";

export type PostFrontmatter = {
  slug: string;
  title: string;
  date: string; // ISO date
  summary?: string;
  image?: string;
  tags?: string[];
};

export type Post = PostFrontmatter & {
  content: string;
};

const contentDir = path.join(process.cwd(), "src", "content", "posts");

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const full = path.join(contentDir, file);
    const source = fs.readFileSync(full, "utf8");
    const { data, content } = matter(source);
    const fm = data as Record<string, unknown>; // Use Record instead of any
    if (!fm.slug) fm.slug = file.replace(/\.mdx$/, "");
    
    // Convert date to string if it's a Date object
    const dateString = fm.date instanceof Date ? fm.date.toISOString() : String(fm.date);
    
    return { 
      ...(fm as PostFrontmatter), 
      date: dateString,
      content 
    } as Post;
  });
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | null {
  const file = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const source = fs.readFileSync(file, "utf8");
  const { data, content } = matter(source);
  const fm = data as Record<string, unknown>; // Use Record instead of any
  
  // Convert date to string if it's a Date object
  const dateString = fm.date instanceof Date ? fm.date.toISOString() : String(fm.date);
  
  return { 
    slug, 
    title: String(fm.title), 
    date: dateString, 
    summary: fm.summary ? String(fm.summary) : undefined, 
    image: fm.image ? String(fm.image) : undefined, 
    tags: Array.isArray(fm.tags) ? fm.tags.map(String) : undefined, 
    content 
  };
}

export async function renderMDX(source: string) {
  const options: PrettyCodeOptions = {
    theme: {
      dark: "vitesse-dark",
      light: "vitesse-light",
    },
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
