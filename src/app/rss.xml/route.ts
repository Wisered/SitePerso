import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/mdx";

export async function GET() {
  const base = "https://arthursaunier.fr";
  const posts = getAllPosts();
  const items = posts
    .map((p) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${base}/blog/${p.slug}</link>
      <guid>${base}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      ${p.summary ? `<description>${escapeXml(p.summary)}</description>` : ""}
    </item>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Arthur Saunier — Blog</title>
      <link>${base}</link>
      <description>Posts on software, web, and experiments</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=UTF-8",
    },
  });
}

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
