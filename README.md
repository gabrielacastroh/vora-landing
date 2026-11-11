# VORA

Public site of VORA, a Colombian clothing brand: home, collection, product pages, about and contact. Orders go through WhatsApp; there is no cart or checkout.

Production: https://www.vora-col.com (the apex domain redirects to `www`).

## Stack

- [Astro 7](https://docs.astro.build), every public page prerendered to static HTML
- React for markup only: components render at build time, no client islands
- Tailwind CSS 4
- GSAP and Lenis for motion, in one deferred script (`src/scripts/motion.ts`)
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
    products.json The catalog: one entry per product
    details.json  "Detalles de la colección" cards on /coleccion
    site.json     Site name, page titles, nav, footer, contact and social links
    catalog.ts    Reads the collections and builds image srcsets
  assets/vora/    Images, processed by Astro
  scripts/        motion.ts: animations, sliders, mobile menu
  styles/         global.css (Tailwind theme, fonts, motion initial states)
  lib/            Small helpers: srcset, whatsapp, jsonld
public/           Files served as-is: favicons, og-image.jpg, robots.txt
```

## Editing content

Content lives in the repository as JSON in `src/data`. The build validates it against the zod schemas in `src/content.config.ts` and `src/data/site.ts`.

### Adding a product

1. Add an entry to `src/data/products.json` with a unique `id` (it becomes the page address) and put its images in `src/assets/vora/`.
2. Set `line` (`unisex` or `womens`) for it to appear on `/coleccion` and get its own page. A product without a line has no public page.
3. Set `featured` to place it on the home page.

The order of the file is the order of the catalog. The product page, its sitemap entry, its structured data and its share image are generated from that one entry.

## SEO

- `Layout.astro` sets the title, description, canonical URL and Open Graph tags for every page. Canonical URLs have no trailing slash, matching the sitemap and internal links.
- Page titles and the default description are in `src/data/site.json`.
- Structured data: `WebSite` and `Organization` on the home page; `Product` and `BreadcrumbList` on product pages.
- `sitemap.xml` lists every public page and product, and `robots.txt` points to it.
- Each product has a 1200×630 JPEG share image at `/og/<slug>.jpg`. Other pages use `public/og-image.jpg`.

Check these tags on the built HTML in `.vercel/output/static`, not on the dev server: URLs differ between the two.

## Performance

- CSS is inlined in each page; the only script is the deferred motion bundle.
- Product and collage images use `srcset` through Vercel Image Optimization (`src/lib/srcset.ts`). Widths must be ones Vercel accepts: 640, 750, 828, 1080, 1200, 1920, 2048, 3840.
- The image above the fold on each page is preloaded through the `preloadImage` prop of `Layout.astro`.
- Animated elements start hidden only when JavaScript and motion are available, and are revealed anyway if the motion script never starts.

## Deployment

Vercel builds the site from this repository. `master` is the production branch.
