# Qualis Eram Design

Portfolio site for Qualis Eram Design, a small bespoke furniture workshop. It has two pages: a home page with a gallery of 18 pieces (each with a photo lightbox) and an About page. Text is available in English, Hebrew (right-to-left) and Latin, chosen with a language switcher and remembered in the browser.

Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS 4. There is no CMS or database: all studio text and the list of works live in `data/works.json`, and photos are in `public/images/<work folder>/`.

## Run it

```bash
npm install
npm run dev      # development server on http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

No environment variables are read by the code.

## Deploy

Deployed on Vercel through its GitHub integration (Vercel project `reno`): pushes to `main` create a Production deployment. There is no `vercel.json`; Vercel's Next.js defaults are used. Vercel Web Analytics is enabled through `@vercel/analytics` in `app/layout.tsx`.

The current deployment is reachable at https://reno-sepia.vercel.app. The canonical URL, sitemap, robots.txt and structured data all use `https://qualiseramdesign.com` (hard-coded in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` and `app/components/StructuredData.tsx`).

## Status

The site is live on the Vercel URL above. As of 2026-11-13, `qualiseramdesign.com` does not serve this site: it returns a redirect to a `/lander` parking page, so the domain still needs to be connected to the Vercel project. There is no CI and there are no tests.
