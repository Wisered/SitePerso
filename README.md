# Personal site — Next.js + Tailwind + MDX

A modern, dark-themed portfolio and blog built with Next.js (App Router), TypeScript, Tailwind CSS, and MDX. Ready for one-click deploy to Vercel.

## Features

- Dark theme with toggle
- MDX blog with code highlighting (Shiki via rehype-pretty-code)
- Pages: Home, About, Projects, Blog (+ dynamic post pages)
- SEO: Metadata, sitemap.xml, robots.txt, RSS feed
- TypeScript, ESLint, Prettier

## Getting started

1. Install deps

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Edit content
- Add MDX posts in `src/content/posts/*.mdx` with frontmatter: `title`, `date` (YYYY-MM-DD), `summary`, `tags`.

## Deploy

- Push to GitHub and import the repo in Vercel. No extra config needed.
- Update the site URL in `src/app/layout.tsx` (`metadataBase`) and in `src/app/robots.ts`/`src/app/sitemap.ts`.

## License

MIT
