"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-16 sm:py-24 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
          Something went wrong
        </h1>
        <p className="text-zinc-400 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center rounded-md bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2"
          >
            Try Again
          </button>
          <Link 
            href="/" 
            className="inline-flex items-center rounded-md border border-white/15 px-4 py-2 hover:bg-white/10"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}