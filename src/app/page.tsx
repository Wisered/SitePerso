import Link from "next/link";

export default function Home() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Building clean, fast, and modern web experiences.
        </h1>
        <p className="mt-5 text-foreground/70">
          I’m Arthur, a software engineer. This is my portfolio and blog—notes on the craft, experiments, and things I’m
          shipping.
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
  );
}
