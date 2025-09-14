import { getAllPosts } from "@/lib/mdx";
import PostCard from "@/components/post-card";

export const metadata = {
  title: "Blog",
  description: "Writing on web, software, and experiments.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <section className="py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">Blog</h1>
  <p className="text-zinc-400 mb-10 max-w-2xl">Long-form notes about engineering, performance, and things I build.</p>
      <ul className="grid gap-6">
        {posts.map((p) => (
          <PostCard key={p.slug} slug={p.slug} title={p.title} date={p.date} summary={p.summary} />
        ))}
      </ul>
    </section>
  );
}
