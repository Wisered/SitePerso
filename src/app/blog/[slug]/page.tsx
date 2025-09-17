import { getAllPosts, getPostBySlug, renderMDX } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { format } from "date-fns";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary ?? undefined,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();
  const mdx = await renderMDX(post.content);

  return (
    <article className="py-10">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">{post.title}</h1>
      <time className="text-sm text-zinc-400">{format(new Date(post.date), "LLL d, yyyy")}</time>
  <div className="mt-8 content">{mdx}</div>
    </article>
  );
}
