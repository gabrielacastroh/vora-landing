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
- [ ] T1 routes + nav + remove gate/auth/env
- [ ] T2 SEO (meta per page, robots, sitemap endpoint)
- [ ] T3 prerender static pages
- [ ] T4 verify: build, every route 200 without cookie, screenshots, head tags per page

## Evidence
(pending)
