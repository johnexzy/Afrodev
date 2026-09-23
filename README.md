# Afrodev

John Oba’s personal work index and writing archive. Built with Nuxt 3, Vue, Nuxt Content, and Tailwind CSS.

## Development

Use Node.js 22 or newer and pnpm.

```sh
pnpm install
pnpm dev
```

The default address is http://localhost:3000. If another project uses that port:

```sh
pnpm dev --host 127.0.0.1 --port 3100
```

## Production

```sh
pnpm build
pnpm preview
```

For a static export, use `pnpm generate`. Generated public files are in `.output/public`. Home, archive, about, and project detail routes are explicitly prerendered; Nuxt Content serves the writing.

The writing subdomain uses a second Vercel project connected to this same repository. Set `BLOG_SITE=true` in that project's build environment, then attach `blog.johnoba.com` as its domain. The normal project remains at `www.johnoba.com` with `BLOG_SITE` unset. The blog build serves the archive at `/` and articles at their existing slugs; its links back to the portfolio use the main domain. In Cloudflare DNS, add the `blog` CNAME to the exact target Vercel shows for the blog project. Do not point it at the `www` project, which serves different routes.

To check the blog build locally:

```sh
BLOG_SITE=true pnpm build
pnpm preview
```

## Where to edit

- `data/work.ts` — project narratives, categories, public links, smaller repositories, and collaborations.
- `pages/index.vue` — featured work and selected article paths.
- `pages/about.vue` — biography and experience.
- `content/` — original Markdown articles, including their frontmatter.
- `css/style.scss` — shared layout, light/dark tokens, typography, and reading styles.
- `components/WorkExhibit.vue` — editorial project illustrations, not product screenshots.
- `components/ProjectPlayground.vue` — explicitly labelled browser demonstrations for Now, PeerPlay, and Pixelator.
- `components/ThreadStudy.vue` — the redrawable connection study on the home page.
- `components/content/` — Markdown images and copyable code blocks.
- `server/api/__sitemap__/urls.ts` — sitemap entries from the project data and published content.

The project detail routes are generated from `data/work.ts`. Existing article URLs are preserved. Writing is ordered by the actual frontmatter date, not the Markdown filename.

## Articles

Create `content/[number].[slug].md` with:

```yaml
---
title: "Your article title"
featured_image: "/images/your-image.jpg"
og_image: "/images/your-image.jpg"
draft: false
description: "A brief description."
author: "John Oba - Afrodev"
date: "7 Sep, 2026"
read_time: "5 min"
category: "Engineering"
---
```

Images in `public/images` are referenced as `/images/...`. They load from the current site origin, including non-default development ports. Comments load on request through Utterances, using the existing GitHub discussion repository.

## Design and sources

See [the refresh notes](docs/design-refresh.md) for the design direction, content evidence, and verification record. Fonts are hosted locally; their OFL licences are included in `public/fonts`.

## Contact

[johnoba.com](https://www.johnoba.com) · [GitHub](https://github.com/johnexzy) · [Email](mailto:obajohn75@gmail.com)
