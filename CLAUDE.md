# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio (Next.js 15 App Router, React 19, Tailwind v4) deployed to Cloudflare Workers via OpenNext at https://sebacry.me. `README.md` (Spanish) is the detailed reference; code comments are in Spanish too, so keep new ones in Spanish.

## Commands

```bash
npm run dev       # next dev --turbopack, http://localhost:3000
npm run build     # next build (plain Next build, typecheck + content asserts)
npm run preview   # OpenNext build + wrangler dev: the real workerd runtime (http://localhost:8787)
npm run deploy    # OpenNext build + wrangler deploy (manual; no CI, git push deploys nothing)
npx eslint app    # lint source
```

- There are no tests. Verify with `npm run build`, and with `npm run preview` for anything that touches runtime behavior: many Workers failures (missing Node APIs, dynamic `require`, bundle size) only appear there.
- `npm run lint` (bare `eslint`) also lints `.open-next/` and `.wrangler/` build output and reports thousands of bogus problems. Lint `app` instead.

## Deployment traps (each one already broke a deploy)

- Never add `--turbopack` to `build`: the worker compiles fine but returns 500 on every route (Turbopack chunks use dynamic `require()`, which Workers forbids). It's fine in `dev`.
- Cache headers for static files live in `public/_headers`, not in `next.config.ts` `headers()`: the `ASSETS` binding serves them before the Next worker runs.
- Scripts call `wrangler deploy` / `wrangler dev` directly, because `opennextjs-cloudflare deploy` / `preview` fail on Windows with `ERR_UNSUPPORTED_ESM_URL_SCHEME`. That only stays equivalent while `open-next.config.ts` configures no incremental cache (R2/KV).
- `wrangler.jsonc` declares only the apex domain on purpose. `www` should be a 301 Redirect Rule in the Cloudflare dashboard, not a second custom domain.
- No `fs` (or other Node-only APIs) in modules that end up in the Worker, including `app/lib/content/*`.
- `next/image`: only the Hero portrait uses it, and it is verified in `npm run preview`. Check any new `next/image` in preview before deploying.

## Architecture

**Content lives in one typed module.** All of Sebas's data (profile, contact, experience, projects, websites, education, skills, languages), in both languages, is in `app/lib/content/portfolio.ts`, declared `satisfies Portfolio` (`schema.ts`). The source of truth is the JSON Sebas provides: never add data that isn't there (no invented numbers, no skill percentages).
- Types catch missing/extra fields and missing translations (`L<T> = Record<Locale, T>`). `Text = string | L<string>` is for proper nouns that don't change between languages.
- `app/lib/content/index.ts` exports `content`, `tr()` and `formatPeriod()`, and runs asserts at import time: periods `YYYY` or `YYYY-MM` with start <= end, URLs `https://` and ASCII (accents percent-encoded), kebab-case unique project ids, reciprocal `sameCodeAs`, no empty strings, `metaDescription` <= 160 chars. The static prerender evaluates the module, so a failing assert breaks `next build` listing every problem.
- Only server components import `content`. Client components (`Navbar`) get plain strings as props; `app/lib/site.ts` (imported by `Navbar`) must not import `content`.
- Privacy: only the first phone is published, never in the JSON-LD. References (third-party phones) are not published; the page only says they're available on request. Never link private repos (e.g. `django-sieki`, 404).

**i18n via real URLs, not a client toggle.** `/` is Spanish (`app/(es)/page.tsx`), `/en` is English (`app/(en)/en/page.tsx`). Each route group has its own root layout, because `<html lang>` can only be set from a root layout. There is no `app/layout.tsx`: both layouts render `app/components/RootDocument.tsx` (fonts, the blocking theme script, JSON-LD) and both pages render `app/components/HomePage.tsx`.

- `app/lib/i18n/es.ts` holds UI text only (nav, labels, buttons) and defines the `Dictionary` type; `en.ts` is typed against it, so a key missing in English fails the build.
- Dictionaries are resolved only in server components. Client components get plain strings (e.g. `Navbar` gets `t={dict.nav}`), never the whole dictionary: it contains functions, which can't cross the RSC boundary.
- Client components import from `app/lib/i18n/config.ts`, never `i18n/index.ts`: `index.ts` pulls both dictionaries into the client bundle.
- `LanguageToggle` uses `<a>`, not `<Link>`, because switching root layouts forces a full reload anyway.
- Adding a locale: a new dictionary typed as `Dictionary`, add it to `locales` (config.ts) and `dictionaries` (index.ts), translate every `L<T>` in `portfolio.ts` (the build fails until you do), plus a new route group with a page and layout. Also update `hreflangAlternates` and `htmlLang`/`ogLocale` in config.ts.

**Shared pieces.** `SECTIONS` (`app/lib/site.ts`) is the ordered section list used by `Navbar` and `Footer`; keep it in sync with the order in `HomePage.tsx`. `app/components/ui.tsx` has `Section` (sticky title on the left, CV-style), `Chips`, `PeriodRow`, `ExternalLink` and `SocialLinks` (Hero, Contact, Footer).

**Server components by default.** Only `Navbar`, `ThemeToggle`, `LanguageToggle`, `ProjectVideo` and `ContactForm` are `'use client'`. The contact form sends through EmailJS (`@emailjs/browser`) with public IDs hardcoded in `ContactForm.tsx`. There is no backend or env vars.

**Theming.** Color tokens are CSS variables on `:root` (dark, the default) and `:root.light` in `app/globals.css`, exposed to Tailwind through `@theme inline` (`bg-primary`, `text-on-primary`, `text-neutral-variant`, etc.). Text on `bg-primary` always uses `text-on-primary` (never `text-white`). The contrast ratios are documented at the top of `globals.css`: recheck them if you change a color. The `light` class is set before first paint by the inline script in `RootDocument.tsx`. Add new colors as variables in both blocks plus a `@theme inline` entry.

## Performance and a11y decisions (don't revert without measuring)

- No animation library and no scroll reveals: the only motion is the Hero entrance (CSS `@keyframes`), and `prefers-reduced-motion` disables it.
- Sections use `.section-defer` (`content-visibility: auto`). That creates a containing block for `position: fixed`, so overlays (the video modal) must be portaled to `<body>`.
- The SEBSBOT demo video is remote (`links.video`) and only loads near the viewport, or on click on mobile / data saver.
- Mobile menu: while open, `main` and `footer` get `inert`, focus moves to the first link and Escape returns it to the toggle.
- Fonts go through `next/font`, never a CSS `@import` from Google Fonts.
- `lucide-react` is tree-shaken via `optimizePackageImports` in `next.config.ts`.
