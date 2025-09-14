export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>
          © {new Date().getFullYear()} Arthur Saunier. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/Wisered" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
          <a href="https://www.linkedin.com/in/arthur-saunier-0700922b5/" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
          <a href="/about" className="hover:text-white">About</a>
        </div>
      </div>
    </footer>
  );
}
