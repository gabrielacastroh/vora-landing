# Feature: perf-vercel-image-service

Objective: srcset via Vercel Image Optimization (user approved the billing implication) and fix the /nosotros LCP.
Branch: perf/vercel-image-service. Route: delegated writer (config + async data layer + 10 components + layout fonts).

## Baseline (Lighthouse 12, mobile, production www.vora-col.com, before this feature, 2026-10-21)
| page | perf | FCP | LCP | TBT | CLS | bytes |
| / | 98 | 1.4 s | 2.1 s | 0 | 0 | 3,611 KiB |
| /nosotros | 74 | 1.4 s | 9.6 s | 0 | 0.007 | 2,867 KiB |
| /contacto | 91 | 1.8 s | 2.9 s | 10 ms | 0 | 408 KiB |
/nosotros LCP element = hero paragraph (data-hero-item); breakdown: render delay 8.8 s (92%). Text is hidden until the motion bundle runs, which awaits document.fonts.ready; Montserrat (hero uses font-mont italic) is not preloaded.

## Tasks
- [ ] T1 imageService on, srcset for heavy images (cards, gallery, origin collage)
- [ ] T2 fix /nosotros LCP (font preload and/or not gating the hero on fonts.ready) without changing animations
- [ ] T3 verify: build, screenshots, then Lighthouse on the deployed site after push (parent)

## Evidence
(pending)
