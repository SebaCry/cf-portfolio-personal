# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio (Next.js 15 App Router, React 19, Tailwind v4) deployed to Cloudflare Workers via OpenNext at https://sebasperez.cc. `README.md` (Spanish) is the detailed reference; code comments are in Spanish too, so keep new ones in Spanish.

## Commands

```bash
npm run dev       # next dev --turbopack, http://localhost:3000
npm run build     # next build (plain Next build, typecheck + content asserts)
npm run preview   # OpenNext build + wrangler dev: the real workerd runtime (http://localhost:8787)
npm run deploy    # OpenNext build + wrangler deploy (manual; no CI, git push deploys nothing)
npx eslint app    # lint source
npm test          # tests/content.test.mjs (node:test, no deps); CHECK_LINKS=1 hits the network, CV_JSON=<path> compares with Sebas's JSON
node --test --test-name-pattern="privacidad" tests/content.test.mjs   # one suite/test by name (`npm test -- --test-name-pattern` does NOT filter)
```

- `npm test` needs Node >= 22.18: it imports the real `.ts` modules (Node type stripping + a resolve hook for extensionless imports). Sebas's JSON is never committed: it has third-party phones. Also verify with `npm run build`, and with `npm run preview` for anything that touches runtime behavior: many Workers failures (missing Node APIs, dynamic `require`, bundle size) only appear there.
- `npm run lint` (bare `eslint`) also lints `.open-next/` and `.wrangler/` build output and reports thousands of bogus problems. Lint `app` instead.

## Deployment traps (each one already broke a deploy)

- Never add `--turbopack` to `build`: the worker compiles fine but returns 500 on every route (Turbopack chunks use dynamic `require()`, which Workers forbids). It's fine in `dev`.
- Cache headers for static files live in `public/_headers`, not in `next.config.ts` `headers()`: the `ASSETS` binding serves them before the Next worker runs.
- Scripts call `wrangler deploy` / `wrangler dev` directly, because `opennextjs-cloudflare deploy` / `preview` fail on Windows with `ERR_UNSUPPORTED_ESM_URL_SCHEME`. That only stays equivalent while `open-next.config.ts` configures no incremental cache (R2/KV).
- `wrangler.jsonc` declares only the apex domain on purpose. `www` should be a 301 Redirect Rule in the Cloudflare dashboard, not a second custom domain.
- No `fs` (or other Node-only APIs) in modules that end up in the Worker, including `app/lib/content/*`.
- No component uses `next/image`. On Workers, without an images binding, `/_next/image` returns the original file unresized (verified in preview: the 154 KB portrait PNG for a 56px avatar). Images are pre-sized webp files in `public/` rendered with `<img>` (with `width`/`height` and an eslint-disable comment explaining why). If you add `next/image`, check its real response size in `npm run preview`.
- `wrangler.jsonc` `main` is `worker/index.mjs`, not `.open-next/worker.js`. It wraps the OpenNext worker only to answer `Range` requests for `/reels/*` (routed there by `assets.run_worker_first`): the `ASSETS` binding ignores `Range`, and Safari won't play a video without a 206. Keep it `.mjs`, so `next build`'s typecheck never sees the import of the generated `.open-next/worker.js`. `tests/range.test.mjs` covers the parser.

## Architecture

**Content lives in one typed module.** All of Sebas's data (profile, contact, experience, projects, websites, education, skills, languages), in both languages, is in `app/lib/content/portfolio.ts`, declared `satisfies Portfolio` (`schema.ts`). The source of truth is the JSON Sebas provides: never add data that isn't there (no invented numbers, no skill percentages).
- Types catch missing/extra fields and missing translations (`L<T> = Record<Locale, T>`). `Text = string | L<string>` is for proper nouns that don't change between languages.
- `app/lib/content/index.ts` exports `content`, `tr()` and `formatPeriod()`, and runs asserts at import time: periods `YYYY` or `YYYY-MM` with start <= end, URLs `https://` and ASCII (accents percent-encoded), kebab-case unique project ids, reciprocal `sameCodeAs`, no empty strings, `metaDescription` <= 160 chars. The static prerender evaluates the module, so a failing assert breaks `next build` listing every problem.
- Only server components import `content`. Client components (`Navbar`) get plain strings as props; `app/lib/site.ts` (imported by `Navbar`) must not import `content`.
- Privacy: only the first phone is published, never in the JSON-LD. References (third-party phones) are not published; the page only says they're available on request. Never link private repos (e.g. `django-sieki`, 404): the only GitHub URL in the content is the profile, and Anderson links only to `https://www.anderson.insure`. `npm test` enforces all of this.
- The home speaks to **employers** (Sebas's choice, 2026-11-11): work first, profile after. Order: Hero → Projects → Video → Websites → Profile (about, experience, education, skills, languages in one section) → Contact. The Hero `h1` is `profile.tagline` (positioning, chosen by Sebas), with `profile.summary` below and three `highlights` cards linking to their anchors (`npm test` checks every `href` exists). `profile.headline` + `bio` still feed Profile, the meta tags and the `CV_JSON` check.
- `content.video` (SEBSMEDIA, client reels, both pipelines, the featured reel's `guion.json` excerpt) is deliberately not in `projects`: `CV_JSON=… npm test` requires `projects` to equal the JSON's list exactly. Its data comes from the READMEs of those repos, SEBSMEDIA's database (video 4) and `jp-media-reel/src/guion.json`. Reel files live in `public/reels/`, and `npm test` checks that each file and poster exists with the same case. README "Añadir un reel" has the ffmpeg commands.

**i18n via real URLs, not a client toggle.** `/` is Spanish (`app/(es)/page.tsx`), `/en` is English (`app/(en)/en/page.tsx`). Each route group has its own root layout, because `<html lang>` can only be set from a root layout. There is no `app/layout.tsx`: both layouts render `app/components/RootDocument.tsx` (fonts, the blocking theme script, JSON-LD) and both pages render `app/components/HomePage.tsx`.

- `app/lib/i18n/es.ts` holds UI text only (nav, labels, buttons) and defines the `Dictionary` type; `en.ts` is typed against it, so a key missing in English fails the build.
- Dictionaries are resolved only in server components. Client components get plain strings (e.g. `Navbar` gets `t={dict.nav}`), never the whole dictionary: it contains functions, which can't cross the RSC boundary.
- Client components import from `app/lib/i18n/config.ts`, never `i18n/index.ts`: `index.ts` pulls both dictionaries into the client bundle.
- `LanguageToggle` uses `<a>`, not `<Link>`, because switching root layouts forces a full reload anyway.
- Adding a locale: a new dictionary typed as `Dictionary`, add it to `locales` (config.ts) and `dictionaries` (index.ts), translate every `L<T>` in `portfolio.ts` (the build fails until you do), plus a new route group with a page and layout. Also update `hreflangAlternates` and `htmlLang`/`ogLocale` in config.ts.

**Shared pieces.** `SECTIONS` (`app/lib/site.ts`) is the ordered section list used by `Navbar` and `Footer`; keep it in sync with the order in `HomePage.tsx` (`npm test` checks it). `app/components/ui.tsx` has `Section`, `Chips`, `PeriodRow`, `ExternalLink` and `SocialLinks` (Hero, Contact, Footer). `Section` has two layouts so sections don't all weigh the same: `stage` (default: big condensed title on top, full-width content) and `aside` (sticky title on the left, CV-style; Websites). `raised` paints the band with `card-bg`, and sections alternate (Projects, Websites, Contact are raised). Inside a raised band the `--surface` token flips to the base background, so cards use `bg-surface`, never `bg-card-bg`, and always contrast with their band.

**Server components by default.** Only `Navbar`, `ThemeToggle`, `ProjectDemo`, `ContactForm`, `VideoDialog`, `Pipeline`, `ScriptSync` and `ReelCard` declare `'use client'`. `VideoSection` and `Projects` resolve every label and step on the server and pass plain strings. `app/lib/media.ts` (`isFrugal`, `prefersReducedMotion`, `useInView`) is shared by the client video components. There are two modals: `ProjectDemo` (native `<dialog>` + `showModal()`, project demos from `projects[].media`) and `VideoDialog` (portal to `<body>`, reels). If you touch either, unify them on `<dialog>`. `LanguageToggle` has no directive but ships to the client anyway because `Navbar` imports it, so the client-bundle rules above apply to it. The contact form sends through EmailJS (`@emailjs/browser`) with public IDs hardcoded in `ContactForm.tsx`. There is no backend or env vars.

**Theming («Visto bueno»: the AI produces, Sebas signs off).** Color tokens are CSS variables on `:root` (dark, the default: graphite with a hint of green) and `:root.light` in `app/globals.css`, exposed to Tailwind through `@theme inline`. One accent, green (Sebas's choice, 2026-11-11), and nothing else gets color. `primary` is the CTA, links and pipeline gates waiting for approval; `approved` is what's done or approved. Today both are the same green, so waiting vs approved is told apart by fill: outline with a blinking dot vs solid with a ✓. Keep them as separate tokens and keep that fill distinction. Text on `bg-primary` / `bg-approved` uses `text-on-primary` / `text-on-approved` (never `text-white`). `npm test` recomputes the WCAG ratios from `globals.css` and fails below 4.5:1, so a color change can't silently break AA. Headings use `.display` (`font-stretch: 78%`): Bricolage Grotesque is loaded as a variable font with its `wdth` axis in `RootDocument.tsx`. The `light` class is set before first paint by the inline script in `RootDocument.tsx`. Add new colors as variables in both blocks plus a `@theme inline` entry.

## Performance and a11y decisions (don't revert without measuring)

- No animation library and no scroll reveals. PR #2 added CSS scroll-driven reveals (`animation-timeline: view()`); they were dropped when it was merged with the redesign (Sebas's choice, 2026-11-11): they hide content until it scrolls in and fight `content-visibility`. Motion that is allowed is tied to meaning or to an action:
  - The Hero entrance and the «Aprobado» stamp on the first highlight (CSS `@keyframes`, one shot).
  - A 2px reading-progress bar under the header (`.scroll-progress`: CSS `animation-timeline: scroll(root)`, no JS, hidden when unsupported).
  - Hover/press microinteractions (from PR #2: `.btn-*`, `.lift`, `.card`, `.arrow-nudge`, `.link`'s growing underline, `.site-logo`). They use the individual `translate`/`scale` properties, which Tailwind v4's `translate-*`/`scale-*` utilities also use, so don't mix both on one element.
  - The pipelines (`Pipeline.tsx`: one `setTimeout` per step plus CSS transitions). They only advance while on screen, have a pause button (WCAG 2.2.2), stack every panel in one grid cell (zero CLS), and don't autoplay under `prefers-reduced-motion`.
- View Transitions (from PR #2): `@view-transition { navigation: auto }` crossfades the `/` <-> `/en` switch; `ThemeToggle` wraps the theme change in `startViewTransition` (circle reveal, `.theme-vt`). Both off under `prefers-reduced-motion`.
- The video section shows proof first (reels) and folds the process (pipelines, `ScriptSync`) into native `<details name="video-como">`: zero JS, findable with Ctrl+F, and a closed pipeline doesn't animate. On mobile the reels are a horizontal snap row (`scroll-px` is needed: snapping ignores the container's padding).
- Nothing autoplays under `prefers-reduced-motion`, on mobile, or with data saver: `ScriptSync` waits for a click. Project demos never autoplay: `ProjectDemo` shows `media.poster` and mounts the `<video>` only while its `<dialog>` is open. Reel cards load only a lazy webp poster; the video mounts on mouse hover (muted) or on click (`VideoDialog`, with sound).
- Nav: 5 sections, so the full row shows from `lg`. Measure `scrollWidth` vs `clientWidth` of `header nav > div` at 1024px if you add one. `LanguageToggle` keeps the visible section's hash, and its links are 44px tall on touch.
- Sections use `.section-defer` (`content-visibility: auto`). That creates a containing block for `position: fixed`: overlays must be a modal `<dialog>` (top layer, like `ProjectDemo`) or portaled to `<body>` (like `VideoDialog`).
- Project demos live in `projects[].media` (`poster`, `video`, `images`); local files are WebP in `public/images/proyectos/`. SEBSBOT's poster is a frame of its own demo, cropped to drop the burned-in subtitles. Site logos are `websites[].logo` (`public/images/sitios/<slug>.svg|webp`, square, shown at 48px on a white tile); the asserts require one per site and `npm test` checks every file exists with the same case.
- Mobile menu: while open, `main` and `footer` get `inert`, focus moves to the first link and Escape returns it to the toggle.
- Fonts go through `next/font`, never a CSS `@import` from Google Fonts. Bricolage loads with `axes: ['opsz', 'wdth']` (131 KB woff2, against 41 KB with weight only): the optical size is what makes the condensed `h1` look the way it does. Known cost, measured on emulated slow mobile: one layout shift of ~0.025 CLS when the font swaps in, because the fallback (Arial) has no condensed width and takes one more line. `display: 'block'` (invisible text, later LCP) and `'optional'` (first slow visit without the condensed look) are worse.
- `lucide-react` is tree-shaken via `optimizePackageImports` in `next.config.ts`.
