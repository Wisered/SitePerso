import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Arthur Saunier — Portfolio & Blog",
    template: "%s — Arthur Saunier",
  },
  description: "Personal site for projects, writings, and contact.",
  openGraph: {
    title: "Arthur Saunier — Portfolio & Blog",
    description: "Personal site for projects, writings, and contact.",
    url: "/",
    siteName: "Arthur Saunier",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arthur Saunier — Portfolio & Blog",
    description: "Personal site for projects, writings, and contact.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-zinc-100`}>
        <div className="min-h-dvh flex flex-col">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
