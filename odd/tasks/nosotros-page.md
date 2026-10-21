# nosotros-page

## Objective
Implement the "Nosotros" page from Figma node 425:148 (file ODJLiz1LXxzxBjsKd5fXCg) at `/nosotros`.

## Scope
- New page `src/pages/nosotros.astro` + static TSX components under `src/components/nosotros/`.
- Nav link "nosotros" in `src/data/site.json` -> `/nosotros`.
- Footer reuses `FrameFooter`; nav reuses `FrameNav` (active = nosotros).
- Animations: GSAP data-attribute engine in `src/scripts/motion.ts` (no React runtime). Figma motion node: 425:150 (hero bg).
- Out of scope: other pages, new dependencies.

## Constraints
- Match existing stack/conventions (fluid rem, Astro assets, content in data files where applicable).
- Assets downloaded locally into `src/assets/vora/` (no temporary Figma URLs).

## Tasks
- [x] T1 Explore repo + Figma (design context, motion context), download assets (60b4e33)
- [x] T2 Build page + components (hero, ADN, "Vora es", "Desde aquí", footer) (0bf8d9a)
- [x] T3 Wire nav link, motion, verify build/render (60b4e33, 6c76ecb; astro build OK, 1440/390 screenshots checked)
- [x] T4 Click-to-expand accordion cards (Figma variants 425:443/425:452/447:550; initCards in motion.ts) (0bf8d9a, 6c76ecb)
- [x] T5 Floating prisms (data-float in motion.ts, ScrollTrigger-paused, no-op under reduced motion) (0bf8d9a, 6c76ecb)
- [x] T6 Scroll reveal animations (data-seq/data-in choreography, data-parallax, data-ken; motion.ts + nosotros components) (f03211f)

## Progress
- Branch `feat/nosotros` created; commit 5e998fc (nav/footer prep).

## Route
- T1-T3: delegated writer (reads that prepare a write + 2+ non-trivial files).

## Next step
Parent: review, decide on gating /nosotros in middleware (currently public).
