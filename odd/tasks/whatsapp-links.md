# Feature: whatsapp-links

Objective: connect the real WhatsApp number (https://wa.me/573052846998) everywhere and make the product "Comprar por WhatsApp" button build a prefilled message from the selected size.
Branch: feat/whatsapp-links (from feat/launch-public-site). Route: delegated writer (site.json + ProductHero + motion.ts).

## Behavior (user request)
- Product page: size selected -> button opens WhatsApp asking about that product in that size. No size selected -> asks about the product and which sizes are available. The message asks about the size either way.
- General links (footer icon, /contacto card): plain https://wa.me/573052846998.

## Tasks
- [ ] T1 site.json social.whatsapp = https://wa.me/573052846998
- [ ] T2 selectable sizes (aria-pressed, filled when selected, click again deselects) + dynamic wa.me href
- [ ] T3 verify in browser (desktop + mobile), no-JS fallback href, build

## Evidence
(pending)
