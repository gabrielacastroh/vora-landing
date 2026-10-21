# home-figma-sync

Objective: sync home (Figma 1:248) images/copy into admin-vora home. Rule: only copy + images; motion untouched.

## Images (Figma node -> local file)
| Figma | Local | Changed |
|---|---|---|
| 1:4 hero bg | hero-couple.webp | yes (new shot, crop top "Good Things"; 120px black left strip cropped out) |
| 90:451 divider | divider-rectangle.png | no (gradient bar) |
| 93:248 FIRST STEP | card-first-step.webp | yes (new red tee mockup) |
| 304:88 KEEP GOING | card-keep-going.webp | yes (new white tee mockup) |
| 304:95 (content = ON MY WAY crop top) | card-on-my-way.webp | yes |
| 304:95 label BEYOND ORDINARY (content = beige tee) | none | unmapped: no product |
| 334:387 BLOOM YOUR OWN WAY | none | unmapped: no product |
| 334:394 / 334:401 | on-my-way / still-becoming | URL labels swapped in brief; STILL BECOMING (pink crop) differs from local lilac tee product, not replaced |
| 112:226, 224, 211, 216, 219, 206, 229, 232 collage | hero-figure, mask-*, gallery-* | no (visually identical) |

## Copy
No differences found vs HomeFrame.tsx. Figma typos not copied: "MOVIMIENRO", "TAMBÍEN" (in a caption).

## Featured rows (added)
Home now matches Figma 1:248. Unisex: FIRST STEP(1), KEEP GOING(2), BEYOND ORDINARY(3). Women's fit: BLOOM YOUR OWN WAY(1), ON MY WAY(2), STILL BECOMING(3).
- `featured` removed from DESDE CERO, TAKE YOUR TIME, KEEP BECOMING (still in /coleccion).
- New products appended at end of products.json (/coleccion: BEYOND ORDINARY = unisex 05, BLOOM YOUR OWN WAY = womens 05; existing numbering unchanged).
- Images: card-beyond-ordinary.webp (1080x850), card-bloom-your-own-way.webp (1080x1350), card-still-becoming.webp now the pink crop top (1080x1350). Figma labels were swapped for two nodes; mapped by content.
- STILL BECOMING: single-color product, no other assets -> variant "Camiseta crop top / Rosa pastel", color + description updated. ON MY WAY variant -> "Camiseta crop top / Beige" (Figma label).

## PLACEHOLDER (needs real copy/price from user)
- beyond-ordinary: description, details (cut, material, print), sizes, copied from KEEP GOING; no gallery/heroImage (card image only).
- bloom-your-own-way: description, details, sizes copied from TAKE YOUR TIME; no gallery/heroImage.
- Prices do not exist in the schema.

## Verification
- npx astro build: pass.
- Dev (auth cookie): /admin-vora, /coleccion, /producto/{beyond-ordinary,bloom-your-own-way,still-becoming} all 200; /admin-vora lists the six names in Figma order.
- Note: /coleccion and /producto redirect (302) to /admin-vora without the admin cookie.
