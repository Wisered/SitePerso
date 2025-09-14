import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects, getProjectBySlug, renderProjectMDX } from "@/lib/projects";

type Params = { slug: string };

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.cover ? [{ url: project.cover }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return (
      <section className="py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">Project not found</h1>
        <Link href="/projects" className="text-sm hover:underline">← Back to projects</Link>
      </section>
    );
  }

  const Content = await renderProjectMDX(project.content);

  return (
    <article className="py-12 sm:py-16">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{project.title}</h1>
        {project.summary && <p className="mt-2 text-zinc-300/90">{project.summary}</p>}
        {project.tech && (
          <div className="mt-3 text-xs text-zinc-400">{project.tech.join(" • ")}</div>
        )}
        {project.external && (
          <a href={project.external} className="mt-3 inline-block text-sm hover:underline" target="_blank" rel="noopener noreferrer">
            Visit project →
          </a>
        )}
      </header>
      {project.cover && (
        <div className="mb-8 overflow-hidden rounded-lg border border-white/10 bg-white/5 max-w-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.cover} alt={project.title} className="max-w-xs h-auto" />
        </div>
      )}
      <div className="content max-w-none">
        {Content}
      </div>
    </article>
  );
}
