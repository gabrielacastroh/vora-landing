# Feature: /contacto page

Objective: implement /contacto from Figma node 460:1325 (file ODJLiz1LXxzxBjsKd5fXCg) with scroll/hover motion consistent with /nosotros.
Branch: feat/contacto. Route: delegated writer (2+ non-trivial files; needs mapping of nosotros components + motion.ts).

## Scope
- New page src/pages/contacto.astro + src/components/contacto/*
- site.json: social links (instagram, tiktok), email, nav "contacto" -> /contacto, footer Contacto link, pages.contacto title (+ site.ts schema)
- Assets downloaded from Figma into src/assets/vora (temporary URLs, 7-day expiry)
- Reuse FrameNav (active="contacto", dark) and FrameFooter; reuse data-attribute GSAP engine in src/scripts/motion.ts

## Tasks
- [x] T1 Assets + data (site.json/site.ts social, email, nav, footer links)
- [x] T2 Page + components (hero copy left, 4 channel cards right, bg photo overlay)
- [x] T3 Motion (staggered reveals, card hover, arrow nudge) + footer social icons wired
- [x] T4 Verify (astro check/build, visual compare vs Figma screenshot)

## Open items
- WhatsApp number not provided: site.json social.whatsapp empty -> card href falls back to "#".
- Email from design: contacto@vora.com (confirm real address).

## Evidence
- Motion reuses existing engine (data-hero/pan/split/line/seq slide); motion.ts unchanged. Footer already had social icons wired from site.json.
- npx astro build: pass. npx astro check: 1 pre-existing error (astro.config.mjs node:url types), none from this feature.
- Dev /contacto: 200; instagram/tiktok/mailto links rendered, whatsapp "#". Desktop 1440 screenshot compared to Figma: layout matches; mobile layout (stacked) not visually verified with final styles.
- Font note: Arimo/Barlow Condensed not installed; mapped to Geist (body) and Archivo (eyebrow) to avoid new deps.
