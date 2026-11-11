# VORA

Public site of VORA, a Colombian clothing brand: home, collection, product pages, about and contact. Orders go through WhatsApp; there is no cart or checkout.

Production: https://www.vora-col.com (the apex domain redirects to `www`).

## Stack

- [Astro 7](https://docs.astro.build), every public page prerendered to static HTML
- React for markup only: components render at build time, no client islands
- Tailwind CSS 4
- GSAP and Lenis for motion, in one deferred script (`src/scripts/motion.ts`)
- [Keystatic](https://keystatic.com) as the admin panel
- Vercel for hosting and image optimization

## Commands

Requires Node 22.12 or newer.

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at http://localhost:4321 |
| `npm run check` | Type-check Astro, TypeScript and content schemas |
| `npm run build` | Production build into `.vercel/output` |

Run `npm run check` and `npm run build` before pushing. The build fails when a product entry is malformed or points at an image that does not exist.

`astro preview` does not work with the Vercel adapter. To see a production build, use a Vercel preview deployment.

## Project layout

```text
src/
  pages/          Routes: index, coleccion, nosotros, contacto, politica-de-privacidad, 404
    producto/     One page per product ([slug].astro)
    og/           Share image per product, generated at build time ([slug].jpg.ts)
    sitemap.xml.ts
  layouts/        Layout.astro: <head>, SEO tags, fonts, page transitions
  components/     Page sections, grouped by page; shared pieces in vora/
  data/
    products/     One JSON file per product (the catalog)
    details/      "Detalles de la colección" cards on /coleccion
    site.json     Site name, page titles, nav, footer, contact and social links
    catalog.ts    Reads the collections and builds image srcsets
  assets/vora/    Images, processed by Astro (one folder per product)
  scripts/        motion.ts: animations, sliders, mobile menu
  styles/         global.css (Tailwind theme, fonts, motion initial states)
  lib/            Small helpers: srcset, whatsapp, jsonld
public/           Files served as-is: favicons, og-image.jpg, robots.txt
keystatic.config.ts   Admin panel schemas
```

## Editing content

Content lives in the repository as JSON, so it can be edited two ways.

**Admin panel.** Open `/keystatic`. In development it writes straight to the files in `src/data`. In production it uses Keystatic Cloud and commits to GitHub, which triggers a deploy; changes are live in a minute or two.

**By hand.** Edit the files in `src/data`.

The schemas exist twice and must stay in sync: zod in `src/content.config.ts` and `src/data/site.ts` (validated at build), and the admin fields in `keystatic.config.ts`.

### Adding a product

1. Create it in the admin panel, or add `src/data/products/<slug>.json` with its images in `src/assets/vora/<slug>/`.
2. Set `line` (`unisex` or `womens`) for it to appear on `/coleccion` and get its own page. A product without a line has no public page.
3. Set `featured` to place it on the home page.
4. Turn `active` off to hide it everywhere without deleting it.

The product page, its sitemap entry, its structured data and its share image are generated from that one file.

## SEO

- `Layout.astro` sets the title, description, canonical URL and Open Graph tags for every page. Canonical URLs have no trailing slash, matching the sitemap and internal links.
- Page titles and the default description are in `src/data/site.json`.
- Structured data: `WebSite` and `Organization` on the home page; `Product` and `BreadcrumbList` on product pages.
- `robots.txt` blocks the admin panel. `sitemap.xml` lists every public page and product.
- Each product has a 1200×630 JPEG share image at `/og/<slug>.jpg`. Other pages use `public/og-image.jpg`.

Check these tags on the built HTML in `.vercel/output/static`, not on the dev server: URLs differ between the two.

## Performance

- CSS is inlined in each page; the only script is the deferred motion bundle.
- Product and collage images use `srcset` through Vercel Image Optimization (`src/lib/srcset.ts`). Widths must be ones Vercel accepts: 640, 750, 828, 1080, 1200, 1920, 2048, 3840.
- The image above the fold on each page is preloaded through the `preloadImage` prop of `Layout.astro`.
- Animated elements start hidden only when JavaScript and motion are available, and are revealed anyway if the motion script never starts.

## Deployment

Vercel builds the site from this repository. `master` is the production branch.
