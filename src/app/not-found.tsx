import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-16 sm:py-24 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl sm:text-8xl font-bold text-zinc-600 mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
          Page Not Found
        </h2>
        <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link 
            href="/" 
            className="inline-flex items-center rounded-md bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}