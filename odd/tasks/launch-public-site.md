# Feature: launch-public-site

Objective: open the whole site to the public (planned for 2026-10-22). Prepared on this branch; DO NOT merge until the user says go.
Branch: feat/launch-public-site. Route: delegated writer (middleware/auth removal, routes, nav data, SEO, sitemap, prerender).

## Scope
1. `/` becomes the real home (HomeFrame, featured products) with neutral brand copy; the "expectativa" teaser is retired (git history keeps it).
2. Remove the login gate: middleware gating /coleccion, /producto/*, /admin-vora; delete admin-auth + ADMIN_PASSWORD env schema; /admin-vora redirects to /.
3. Nav/footer "Inicio" href /admin-vora -> /.
4. SEO: no noindex anywhere public; robots.txt allows all; sitemap lists /, /coleccion, /nosotros, /contacto and the 12 /producto/<slug> pages; unique title/description/canonical per page.
5. Perf: pages no longer private -> prerender what is static so the CDN caches it (only if build + checks pass).

## Open items for the user (not blockers for the code)
- WhatsApp number (buttons go to "#" until site.json social.whatsapp is set).
- Real privacy policy page (footer link is "#").
- Final home title/description copy (neutral placeholder from site.json for now).

## Tasks
- [x] T1 routes + nav + remove gate/auth/env
- [x] T2 SEO (meta per page, robots, sitemap endpoint)
- [x] T3 prerender static pages
- [x] T4 verify: build, every route 200 without cookie, screenshots, head tags per page

## Evidence
- T1 930370e, T2 d02d7fa, T3 c2a885d. Route: delegated writer, inline.
- `npx astro build`: passes; dist/client has index/coleccion/nosotros/contacto + 16 producto/<slug>/index.html + sitemap.xml (static).
- Dev :4322, no cookie: all 20 pages 200 (/, /coleccion, /nosotros, /contacto, 16 products), 20/20 unique titles, self canonical on www.vora-col.com, robots "index, follow", 1 h1 each, 10 og tags each; /sitemap.xml 200 application/xml with 20 <loc>; /robots.txt 200; /admin-vora 301 -> /.
- Screenshots (mobile 440x956@2, desktop 1440x900@1) of /, /coleccion, /producto/first-step reviewed: home identical to old authed home; nav "inicio" from /nosotros lands on /.
- grep astro:env / ADMIN_PASSWORD (excluding .env*, odd): none.
- Product og:image kept as default og-image.jpg (Layout declares 1200x630); card image only in Product JSON-LD.
- Unused after teaser removal (not deleted): public/video/expectativa-{hero,train,train-mobile}.mp4 (~2.8 MB), src/assets/vora/expectativa-*.webp/svg (9 files). Last commit with teaser: c5f1140.
- Vercel: ADMIN_PASSWORD env can be removed after launch.
