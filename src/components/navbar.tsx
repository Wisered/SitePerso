"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link href="/documents" className="hover:text-white">Documents</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="sm:hidden p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>
      
      {/* Menu mobile */}
      {isOpen && (
        <div className="sm:hidden border-b border-white/10 bg-black/80 backdrop-blur">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3 text-sm text-zinc-300/90">
            <Link href="/projects" className="hover:text-white py-2" onClick={() => setIsOpen(false)}>
              Projects
            </Link>
            <Link href="/blog" className="hover:text-white py-2" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link href="/about" className="hover:text-white py-2" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/documents" className="hover:text-white py-2" onClick={() => setIsOpen(false)}>
              Documents
            </Link>
            <Link href="/contact" className="hover:text-white py-2" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
