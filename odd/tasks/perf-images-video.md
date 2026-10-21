# Feature: perf-images-video

Objective: cut mobile data and layout shift. (1) images: width/height, loading/decoding, srcset where feasible; (2) lazy-start the 1.8 MB train video.
Branch: perf/images-and-video. Route: delegated writer (10+ files + mapping). Lighthouse baseline/after measurement is a separate later step the user asked for.

## Scope
- All <img> in src/components/** and src/pages/** (width/height from imported ImageMetadata, loading/decoding, fetchpriority only on LCP)
- Optional src/lib helper for srcset via astro:assets getImage, only if it works from static TSX
- src/pages/index.astro train video lazy start (+ small mobile encode if ffmpeg exists), small helper in src/scripts/motion.ts
- Hard rule: no change to layout, motion attributes or animations.

## Tasks
- [x] T1 width/height + loading/decoding on every img (hero/LCP stay eager + fetchpriority)
- [ ] T2 BLOCKED (needs decision, see evidence): responsive srcset for the heaviest images
- [x] T3 lazy-start train video (IntersectionObserver), mobile source if ffmpeg available
- [x] T4 (no "before" numbers: skipped git stash to avoid disturbing the live dev server) verify: astro build, browser screenshots mobile+desktop of /nosotros, /contacto, home, network payload before/after

## Evidence
- T1 47256ca: loading/decoding on all img (hero/LCP/nav stay eager + fetchPriority); width/height only where metadata is at hand and CSS size is not forced (Adn stars, Band sequence, Origin untouched: src is a string prop). `astro build` passes; screenshots of /nosotros, /contacto, /, shop + product (temp pages, deleted) mobile+desktop show no visual change.
- T2 not applied: getImage works from .astro in dev, but components are sync TSX and image URLs are async; production with @astrojs/vercel and imageService unset would serve /_image through the serverless function (sharp at runtime, no Vercel CDN optimizer). Needs a user decision: enable `imageService: true` in astro.config.mjs and resolve srcsets in the async catalog/page layer (or move to .astro <Image>). Not verifiable locally.
- T3 ba750c3: train video has data-src/data-src-mobile, starts via IntersectionObserver (300px margin), pauses when far. Mobile encode 720p CRF30: 1.9 MB -> 422 KB. Observed on mobile viewport: video has no src and no train request until scrolled near, then expectativa-train-mobile.mp4 loads and plays.
- Dev-mode image/video resources at first paint (mobile, no scroll): / 19 reqs ~1.8 MB, /nosotros 34 reqs ~3.1 MB (dev serves unoptimized assets).
