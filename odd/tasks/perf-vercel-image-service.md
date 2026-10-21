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
- [x] T1 imageService on, srcset for heavy images (cards, gallery, origin collage) (95a33ed)
- [x] T2 fix /nosotros LCP via font preloads (option a); fonts.ready gate left untouched (ace955b). Effect on LCP unmeasured until Lighthouse
- [ ] T3 verify: build and screenshots done locally; Lighthouse on the deployed site after push (parent) pending

## Evidence
- astro build passes; .vercel/output/config.json has images.sizes [640,750,828,1080,1200,1920,2048,3840].
- Dev /_image URLs return 200 image/webp (q=75, widths snapped to the Vercel sizes list; Vercel only accepts those widths).
- Mobile 440@2x picks: product slides w=1080 (photos) / w=640 (packshot, source-limited); shop cards w=640; Origin pieces w=640.
- /nosotros mobile image bytes with lazy forced eager (dev): 4953 KB before, 3430 KB after.
- Fonts: Montserrat normal+italic and Archivo italic now fetched at ~65 ms in parallel with the other preloads (were discovered after CSS/layout).
- Screenshots reviewed (mobile/desktop of /, /nosotros, /contacto, shop and product via temporary pages, deleted): no visual difference.
- Not verified: production /_vercel/image behaviour, Lighthouse.
