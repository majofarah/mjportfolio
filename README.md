# Portfolio — María José Farah

Built with [Astro](https://astro.build) (static output, no UI framework — the carousel
is plain JS co-located in its component). Deployed to GitHub Pages via GitHub Actions.

```
astro.config.mjs           Astro config (sitemap; no hardcoded site/base, see below)
public/
├── favicon.svg              Tab icon, built from the site's own color tokens
└── og-image.jpg             Social-share preview image (OG / Twitter)
src/
├── layouts/Layout.astro     <head>: meta, fonts, OG/Twitter, hero preload, favicon
├── styles/styles.css        Design tokens + components + responsive
├── data/
│   ├── lines.ts               The 6 furniture lines (name, note, image)
│   ├── cases.ts                The 2 case studies (copy, detail list, PDF link)
│   └── docs.ts                  The 4 documentation links
├── components/                One component per section, plus Carousel.astro and
│   Gallery.astro (the two "media" shapes a case study can use)
├── assets/img/               Source photos — Astro processes these at build time
│   (WebP + srcset)
└── pages/index.astro         Assembles the page from Layout + components + data
.github/workflows/astro.yml  Build + deploy to GitHub Pages (see below)
```

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs dist/
npm run preview   # serves dist/ locally
```

## Publishing to GitHub Pages

Already configured — no manual steps needed to publish. The repo has:

- **Settings → Pages → Source: GitHub Actions** (already enabled)
- `.github/workflows/astro.yml`: on every push to `main`, installs dependencies, runs
  `astro build --site ... --base ...` (both values are injected by the workflow itself
  from the repo's Pages configuration — that's why `astro.config.mjs` doesn't hardcode
  them), and publishes `dist/` as the site.
- Deployment uses the modern Pages path (`upload-pages-artifact` + `deploy-pages`), not
  Jekyll — so the usual Jekyll gotcha of ignoring folders starting with `_` (like
  `_astro/`) doesn't apply here.

Live site: **https://majofarah.github.io/mjportfolio/**

## Conventions

**Tokens.** Colors, typography, radii, and spacing live in `:root`
(`src/styles/styles.css`, section 1). Change the palette or fonts there, not in
individual components.

**Typography.** DM Serif Display for headings, DM Sans for body text. Loaded from
Google Fonts in `Layout.astro`.

**Images.** Every photo is pre-cropped to its frame's aspect ratio (CSS uses
`object-fit: cover`). Astro automatically generates WebP versions at several widths
(`widths`/`sizes` on each `<Image>`) — to replace a photo, just drop the new file into
`src/assets/img/` with the same name; no manual optimization needed.

**Repeated content.** Furniture lines, case studies, and documentation links live in
`src/data/*.ts`, not in the HTML — adding or editing one of these items means editing
those files, not touching components.

**Carousel.** `Carousel.astro` is the only component with `data-carousel`; its logic
(auto-rotation, pause on hover, pause when the tab is hidden) lives in a `<script>`
co-located in the same file. `data-interval` (ms) controls the speed.

**Case studies.** `ProjectCase.astro` is generic — it takes the copy as props and the
media block (`Gallery` or `Carousel`) as a slot. The `reverse` prop isn't just
cosmetic: it controls the actual DOM order, which is what decides which column each
block sits in on desktop — keep it in sync with the intended layout when adding a new
case.

**PDF links.** Hosted on Google Drive; the `href`s in `src/data/cases.ts` and
`src/data/docs.ts` point to the share links. To swap a document, just replace the
`href`.
