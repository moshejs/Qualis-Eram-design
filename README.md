# Qualis Eram Design

> **Status (checked 2026-11-21): `qualiseramdesign.com` does not serve this site.** The domain is attached to the Vercel project, but its DNS still points to the registrar's parking servers, so it returns a small page that redirects to `/lander`. The site itself is live at https://reno-sepia.vercel.app. See [Deploy](#deploy).

Portfolio site for Qualis Eram Design, a small bespoke furniture workshop ("Bespoke furniture in walnut, cherry, ash and salvage. Studio and commissioned pieces — hand-built, one at a time."). It has two pages: a home page with a gallery of 18 pieces, each with a photo lightbox, and an About page. All text is available in English, Hebrew and Latin.

## Stack

From `package.json` and `package-lock.json` (lockfile v3):

- Next.js 15.5 (App Router), React 19.2, TypeScript 5.9
- Tailwind CSS 4.3 via `@tailwindcss/postcss`
- `@vercel/analytics` 2.0 (Vercel Web Analytics, mounted in `app/layout.tsx`)
- npm. No Node version is pinned in the repo (no `engines`, `.nvmrc` or `.node-version`); the Vercel project builds with Node 24.x.

Scripts: `dev`, `build`, `start`, `lint` (`next lint`).

## Structure

- `app/`: routes. `page.tsx` (home), `about/page.tsx`, `sitemap.ts`, `robots.ts`, icons (`favicon.ico`, `icon.png`, `apple-icon.png`). Components are in `app/components/`.
- `data/works.json`: all content. `studio` holds the name, tagline, About text and UI labels; `works` holds the 18 pieces. Every text field is an `{ en, he, la }` object. There is no CMS or database. Types are in `lib/types.ts`, loaders in `lib/works.ts`.
- Languages: one URL per page, not per language. `lib/i18n.tsx` keeps the chosen language in React state and in `localStorage` (`reno.locale`). Hebrew sets `dir="rtl"` on `<html>`; an inline script in `app/layout.tsx` applies the saved language and direction at the top of `<body>`, before the page content. The server always renders English.
- Images: `public/images/<NN_date_name>/`, 76 JPEGs, about 165 MB in total (largest folders 19 to 26 MB). They are served through `next/image` (AVIF/WebP, set in `next.config.mjs`). Brand assets are in `public/brand/` (about 1 MB); the social image is `public/og.jpg`.

## Run it locally

```bash
npm ci          # or npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
```

Checked on a fresh clone on 2026-11-21 with Node 26.10 and npm 11.19: `npm ci` and `npm run build` both passed. The build prerenders `/`, `/about`, `/robots.txt`, `/sitemap.xml` and the icons as static pages. npm warns that `sharp` has an install script that is not on its allow list; the build passes anyway.

`npm run lint` does not work yet: there is no ESLint config, so `next lint` (deprecated in Next 15.5) opens an interactive setup prompt instead of linting.

## Environment variables

None. The code reads no `process.env` values, and the Vercel project `reno` has no environment variables set (`vercel env ls --project reno --scope quentin-code`).

## Deploy

Vercel project `reno` in the `quentin-code` team, connected to this repo through Vercel's GitHub integration (no `vercel.json`, Next.js preset defaults).

- The production branch is `main`. Every push to `main` builds and deploys to Production automatically; other branches get Preview deployments.
- Domains attached to the project: `qualiseramdesign.com` (production), `www.qualiseramdesign.com` (308 redirect to the apex) and `reno-sepia.vercel.app`.
- `qualiseramdesign.com` is not live yet. Its nameservers are still the registrar's (`ns47/ns48.domaincontrol.com`) and its A records point to the registrar's parking IPs, not to Vercel; `vercel domains inspect qualiseramdesign.com` reports the domain as not configured properly. To go live, add the DNS records Vercel asks for under the project's Domains settings (or switch the nameservers to Vercel).
- The canonical URL, sitemap, robots.txt and structured data already use `https://qualiseramdesign.com` (hard-coded in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` and `app/components/StructuredData.tsx`).

Sources: `vercel ls reno`, `vercel project inspect reno`, `vercel domains inspect qualiseramdesign.com` and the Vercel project API (git link, production branch, domains), all with `--scope quentin-code`.

## Known gaps

Checked 2026-11-21. On `qualiseramdesign.com` every launch basic is missing (no title, description, canonical, Open Graph, Twitter, favicon, viewport or structured data) because the domain serves the parking page, not this app. The fix is DNS, not code.

On the deployed app (https://reno-sepia.vercel.app):

| Check | Home page today |
|---|---|
| Title | Present: "Qualis Eram Design · Bespoke Furniture" (38 characters) |
| Meta description | Present (131 characters) |
| Canonical | Present (`https://qualiseramdesign.com`) |
| Open Graph | Present: title, description, url, site_name, locale, type, image 1200×630 with alt |
| Twitter card | Present: `summary_large_image` with title, description, image |
| Favicon and icons | Present: `favicon.ico`, 512px `icon.png`, 180px `apple-icon.png` |
| Viewport | Present |
| Structured data | Present: JSON-LD `LocalBusiness`, `Person`, `ItemList` of the works |
| Sitemap, robots.txt, 404 | Present; unknown paths return HTTP 404 |

Real gaps on the app:

- `/about` has the same title as the home page and its canonical points to the home page, so search engines may treat it as a duplicate.
- The `hreflang` links for `en`, `he` and `la` all point to the same URL, because languages are switched in the browser rather than served at their own URLs. Hebrew and Latin content is not indexable.
- No web app manifest (`/manifest.webmanifest` returns 404).

## Tests and CI

There are no tests and no CI (no `.github/` folder). The only automated check is Vercel's build on each push.
