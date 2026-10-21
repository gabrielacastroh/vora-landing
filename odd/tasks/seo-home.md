# Feature: seo-home

Objective: apply the SEO proposal (user-provided screenshot "02 / Código para el encabezado HTML" + "03 / Recomendaciones técnicas") to the public site.
Branch: feat/seo-home. Route: delegated writer (Layout, config, home page, public files).

## Spec (from the user's document)
Home <head>: title "VORA Colombia | Moda contemporánea"; meta description "Descubre VORA, una marca de moda contemporánea en Colombia. Ambición, propósito y evolución. Sigue nuestras redes y conoce lo que viene."; canonical https://www.vora-col.com/; og:type website; og:title "VORA Colombia | Moda contemporánea"; og:description "Ambición, propósito y evolución. Descubre lo que viene con VORA."; og:url https://www.vora-col.com/; robots "index, follow"; <html lang="es-CO">.
Recommendations: favicon (exists) + og:image absolute public URL; sitemap.xml + robots.txt (+ Search Console is the user's step); a single visible H1 consistent with the expectation stage; canonical must match the definitive public domain (apex 308-redirects to www, so www is canonical).

## Tasks
- [x] T1 Layout: lang es-CO, canonical (Astro.site), og:*/twitter tags with page overrides, robots meta
- [x] T2 home page values + og:image asset (1200x630) + sitemap.xml + robots.txt
- [x] T3 verify (build, rendered head, one h1, curl local files)

## Evidence
- `npx astro build`: passes.
- Dev on :4322 (own server, stopped after): `/` renders lang es-CO, title/og:title "VORA Colombia | Moda contemporánea", canonical + og:url https://www.vora-col.com/, robots "index, follow", og:image https://www.vora-col.com/og-image.jpg (1200x630), twitter summary_large_image. /nosotros and /contacto have own description and own canonical.
- Exactly one <h1> on /, /nosotros, /contacto (grep count).
- /robots.txt and /sitemap.xml: 200. public/og-image.jpg: JPEG 1200x630, 64655 bytes (crop of expectativa-hero-poster, no added text).
- /coleccion without cookie: 302 -> /admin-vora (middleware untouched).
- Not verified: Search Console indexing, social og:image rendering, production behavior.
- Open decision: add /nosotros and /contacto to the sitemap (currently home only).
