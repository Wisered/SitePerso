export default function Loading() {
  return (
    <section className="py-16 sm:py-24 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-zinc-400">Loading...</p>
      </div>
    </section>
  );
}