export const metadata = {
  title: "Projects",
};
import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <section className="py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">Projects</h1>
      <ul className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <li key={p.slug} className="rounded-lg border border-white/10 bg-white/5 p-5">
            <h2 className="text-xl font-medium">
              <Link href={`/projects/${p.slug}`} className="hover:underline">
                {p.title}
              </Link>
            </h2>
            {p.summary && <p className="mt-2 text-zinc-300/90">{p.summary}</p>}
            {p.tech && <div className="mt-3 text-xs text-zinc-400">{p.tech.join(" • ")}</div>}
            <div className="mt-3">
              <Link href={`/projects/${p.slug}`} className="text-sm hover:underline">
                Read more →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
