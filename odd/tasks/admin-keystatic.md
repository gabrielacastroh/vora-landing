# admin-keystatic

Branch: `feat/admin-keystatic` (from master). NEVER merge to master/main unless the user says so (site is in production).

## Objective
Let an admin edit site content (products, details, site texts, images) from a panel, with no custom backend. Decision: Keystatic (git-based CMS), $0. Supabase rejected: content-only need, Pro costs $25/mo, loses Astro image pipeline.

## Constraints
- `output: 'server'` + `@astrojs/vercel`; every page prerenders.
- `@keystatic/astro@6.0.0` supports Astro 5/6/7 and React 19.
- Images are relative paths validated with `image()`; must keep working.
- Production deploys from master: admin commits would land there; keep local mode on this branch.
- Delivery strategy: ask-on-risk. Forecast < 400 changed lines per task.

## Tasks
- [x] T1 (delegated writer; evidence: 16 files, `order` field, before/after build snapshots `diff -r` identical, `astro build` passes; `astro check` 1 pre-existing-looking error astro.config.mjs `node:url` / missing @types/node, unconfirmed on base) Migrate `src/data/products.json` (array) to one file per product (`src/data/products/<id>.json`) with `glob()` loader. No visual change; build output identical. Route: delegated writer (loader, catalog.ts, data split).
- [~] T2 Install Keystatic in local mode; schemas for products, details, site.json; panel route. DONE partial in 90a72fa (integration, products + site schemas; build HTML identical, /keystatic 200). Gaps moved to T2b.
- [x] T2b (done; evidence: built HTML diff -r identical incl. hashes, build passes (parent re-ran), createReader round-trip 16 products + 3 details, /keystatic 200; panel image upload NOT tested in UI) (user approved 2026-10-22): per-product asset folders `src/assets/vora/<slug>/` so `fields.image` can upload (copy, never move, files also referenced outside product JSON); switch image fields from text to `fields.image`; relax zod for `line`/`gallery` (Keystatic writes `""`/`[]`); split `details.json` into one file per card with glob() + Keystatic collection (`frame` as 4 optional numbers).
- [ ] T3 GitHub mode + panel protection + deployment notes.

## Acceptance
- T1: `astro build` passes; pages `/`, `/coleccion`, `/producto/*` render the same products in the same order (sort order previously came from products.json file order, must be preserved explicitly).

## Progress
- Branch created. Exploration done (astro.config.mjs, content.config.ts, products.json shape).

## Next step
T1.
