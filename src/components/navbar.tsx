import Link from "next/link";

export default function Navbar() {
  return (
  <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold tracking-tight hover:opacity-80">
            Arthur Saunier
          </Link>
          <div className="hidden sm:flex items-center gap-4 text-sm text-zinc-300/90">
            <Link href="/projects" className="hover:text-white">Projects</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
        <div className="flex items-center gap-3" />
      </nav>
    </header>
  );
}
