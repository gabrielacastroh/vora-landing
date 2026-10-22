# Feature: whatsapp-links

Objective: connect the real WhatsApp number (https://wa.me/573052846998) everywhere and make the product "Comprar por WhatsApp" button build a prefilled message from the selected size.
Branch: feat/whatsapp-links (from feat/launch-public-site). Route: delegated writer (site.json + ProductHero + motion.ts).

## Behavior (user request)
- Product page: size selected -> button opens WhatsApp asking about that product in that size. No size selected -> asks about the product and which sizes are available. The message asks about the size either way.
- General links (footer icon, /contacto card): plain https://wa.me/573052846998.

## Tasks
- [x] T1 site.json social.whatsapp = https://wa.me/573052846998
- [x] T2 selectable sizes (aria-pressed, filled when selected, click again deselects) + dynamic wa.me href
- [x] T3 verify in browser (desktop + mobile), no-JS fallback href, build

## Evidence
- T1 2b9003c, T2 049ce70. `astro build` passes; built first-step HTML has the wa.me href with the no-size message (no-JS fallback).
- Browser (built dist served statically on :4322; astro dev refuses a 2nd server while :4321 runs): M -> "... en talla *M*. ¿Está disponible?", L unpresses M, L again -> no-size message; bloom-your-own-way shows "(Camiseta crop top / Blanco)". Desktop + mobile screenshots: selected size filled, layout unchanged.
- /contacto: footer icon and WhatsApp card both https://wa.me/573052846998 (plain); other cards unchanged.
- Not verified: real WhatsApp send, phone browsers.
