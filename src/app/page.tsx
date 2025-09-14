import Link from "next/link";

export default function Home() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Personnal website of Arthur Saunier
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
  );
}
