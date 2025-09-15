import Link from "next/link";
import Image from "next/image";

export default function ProjectCard(props: {
  slug: string;
  title: string;
  date?: string;
  summary?: string;
  cover?: string;
  tech?: string[];
  external?: string;
}) {
  const { slug, title, date, summary, cover, tech, external } = props;
  
  const formattedDate = date ? new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }) : null;

  return (
    <li className="rounded-lg border border-white/10 hover:border-white/20 transition bg-white/5 overflow-hidden">
      <Link href={`/projects/${slug}`} className="block">
        <div className="aspect-video relative overflow-hidden bg-white/5">
          {cover ? (
            <Image
              src={cover}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Image
                src="/window.svg"
                alt="Default project icon"
                width={48}
                height={48}
                className="opacity-50"
              />
            </div>
          )}
        </div>
        <div className="p-5">
          <h2 className="text-xl font-medium mb-1">{title}</h2>
          {formattedDate && (
            <time className="text-xs text-zinc-400">{formattedDate}</time>
          )}
          {summary && (
            <p className="mt-3 text-zinc-300/90 text-sm">{summary}</p>
          )}
          {tech && tech.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 text-xs rounded-md bg-white/10 text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={external ? "/globe.svg" : "/window.svg"}
                alt={external ? "External project" : "Internal project"}
                width={16}
                height={16}
                className="opacity-70"
              />
              <span className="text-xs text-zinc-400">
                {external ? "External link" : "Project details"}
              </span>
            </div>
            {external && (
              <span className="text-xs text-zinc-400">→</span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}