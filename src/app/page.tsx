import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { getAllProjects } from "@/lib/projects";
import PostCard from "@/components/post-card";
import ProjectCard from "@/components/project-card";

export default function Home() {
  const posts = getAllPosts().slice(0, 3); // Get the 3 most recent posts
  const projects = getAllProjects().slice(0, 2); // Get the 2 most recent projects

  return (
    <div className="py-16 sm:py-12 space-y-16">
      {/* Hero Section */}
      <section>
        <div className="max-w-6xl">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Personal website of Arthur Saunier
          </h1>
          <p className="mt-5 text-foreground/70">
            I am a third-year student at Télécom Nancy, specializing in Internet Systems and Security (ISS).
          </p>
          <p className="mt-3 text-foreground/70">
            This website serves as a platform to share my projects, notes, and experiments related to my interests and studies.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/projects" className="inline-flex items-center rounded-md bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2">
              View Projects
            </Link>
            <Link href="/blog" className="inline-flex items-center rounded-md border border-white/15 px-4 py-2 hover:bg-white/10">
              Read the Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {projects.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Featured Projects
            </h2>
            <Link 
              href="/projects" 
              className="text-zinc-400 hover:text-zinc-300 transition-colors text-sm"
            >
              See all projects →
            </Link>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                slug={project.slug}
                title={project.title}
                date={project.date}
                summary={project.summary}
                cover={project.cover}
                tech={project.tech}
                external={project.external}
              />
            ))}
          </ul>
        </section>
      )}

      {/* Recent Blog Posts Section */}
      {posts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Recent Posts
            </h2>
            <Link 
              href="/blog" 
              className="text-zinc-400 hover:text-zinc-300 transition-colors text-sm"
            >
              See all posts →
            </Link>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                summary={post.summary}
              />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
