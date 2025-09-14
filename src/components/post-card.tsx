import Link from "next/link";

export default function PostCard(props: {
  slug: string;
  title: string;
  date: string;
  summary?: string;
}) {
  const { slug, title, date, summary } = props;
  const d = new Date(date);
  const formatted = d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <li className="rounded-lg border border-white/10 hover:border-white/20 transition p-5 bg-white/5">
      <Link href={`/blog/${slug}`} className="block">
        <h2 className="text-xl font-medium mb-1">{title}</h2>
        <time className="text-xs text-zinc-400">{formatted}</time>
        {summary && <p className="mt-3 text-zinc-300/90">{summary}</p>}
      </Link>
    </li>
  );
}
