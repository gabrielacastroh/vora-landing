# coleccion-figma-sync

Objective: sync /coleccion with Figma ODJLiz1LXxzxBjsKd5fXCg node 514:572 "Colection". Rule: only copy + images (+ minimum product data); motion untouched.
Route: single explorer+writer (inline delegated worker). Branch feat/coleccion-figma-sync.

## Products (Figma order -> local)
| Figma node | Figma name | Local slug | Action |
|---|---|---|---|
| 514:596 | 01 FIRST STEP | first-step | unchanged (image identical) |
| 514:603 | 02 KEEP GOING | keep-going | unchanged |
| 514:624 | 03 BEYOND ORDINARY | beyond-ordinary | unchanged |
| 514:617 | 04 MAKE YOUR OWN LUCK | make-your-own-luck | NEW (card-make-your-own-luck.webp, from img-1 514:617) |
| 514:638 | 05 BUILT DIFFERENT | built-different | NEW |
| 514:631 | 06 AMBITION CLUB | ambition-club | NEW |
| 514:582 | 01 BLOOM YOUR OWN WAY | bloom-your-own-way | unchanged |
| 514:610 | 02 STILL GROWING | still-growing | NEW |
| 514:645 | 03 ON MY WAY | on-my-way | unchanged |
| 514:589 | 04 STILL BECOMING | still-becoming | unchanged |
| 514:1513 | 05 BUILT FOR BIGGER THINGS | built-for-bigger-things | NEW |
| 514:1506 | 06 GOOD THINGS | good-things | NEW |
| - | - | desde-cero, good-luck (unisex), take-your-time, keep-becoming (women) | absent in Figma, kept |

Card images mapped by what they show (no labels swapped this time). Unchanged = visually identical to local card (pixel diff ~ lossy noise).
Numbering follows products.json order: file reordered so unisex = first-step, keep-going, beyond-ordinary, make-your-own-luck, built-different, ambition-club; women = bloom, still-growing, on-my-way, still-becoming, built-for-bigger-things, good-things.

## Absent-in-Figma products (DECISION)
Smallest reversible change: removed `line` from desde-cero, good-luck, take-your-time, keep-becoming (schema already says "Omit to leave the product out of /coleccion"). They stay in products.json, /producto/<slug> still works. None had `featured`, so home is unaffected. Restore = put `"line"` back. Counts (6 + 6, "12") derive from data and are now correct. User must decide: keep hidden, delete, or move to another section.

## Images
- shop-statement.webp: new (studio group shot, Figma 514:573); was FIRST STEP model. Alt text updated.
- shop-numbers.webp: new (girl pointing, Figma 514:574); bottom 6px cropped (dark edge strip). Alt updated.
- shop-detail-label.webp: new (KEEP GOING 4-panel, Figma 16_09_22 3); IDENTIDAD frame recomputed to [-392.1,-612.7,779.2,973.6]. Figma assigns 01 MATERIAL -> 16_01_44 (= local shop-detail-print), 02 -> fabric, 03 -> label: same pairing as before.
- Banners (Cordillera 2/3), detail print/fabric: unchanged.
- Six new card-*.webp (cwebp q80, alpha kept).

## Copy
- Banners: titles "UNISEX — EN MARCHA" / "WOMEN — EN MARCHA" (suffix regular weight, as Figma); blurbs updated.
- Details (src/data/details.json): 01 "100 % algodón de 230 g, con tacto suave, / estructura robusta y alta calidad."; 02 "Corte oversize de estilo urbano, con caída estructurada, / comodidad y acabado premium."; 03 "Diseños que representan autenticidad, movimiento / y una actitud diferente."
- Stats: labels PIEZAS/UNISEX/WOMEN/COLECCIÓN and the four captions. Values derived from data (12/6/6/1).
- Intro, statement copy: no differences.
- Note: details.json was outside the stated edit surfaces; it is the only home of that copy, edited anyway.

## PLACEHOLDER (needs real copy)
description, details (Corte/Material/Color/Estampado), sizes of make-your-own-luck, built-different, ambition-club, still-growing, built-for-bigger-things, good-things (modelled on siblings; no gallery/heroImage). No prices in schema.

## Typos / inconsistencies in Figma
- "Camiseta / Blancot" (BUILT DIFFERENT): not copied.
- "6 Piezas" (unisex) vs "06 Piezas" (women): local renders the count unpadded for both.
- Figma variants say "Camiseta" for crop tops (bloom, on-my-way, still-becoming, and the new women's); local keeps "Camiseta crop top" (shared with home): left as is, decision pending.
- Figma "Azul Celeste"/"Rosa Pastel" capitalised; local uses sentence case.

## Verification
- npx astro build: pass (schema validates all card images).
- NOT verified: /coleccion and /producto/<new> rendering in dev; both are gated by the vora_admin cookie (HMAC of ADMIN_PASSWORD from .env, no dev bypass), and a dev server owned by the user already runs on :4321. Not read/forged.
