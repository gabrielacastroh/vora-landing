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

## Pending (needs product decision)
Add products BEYOND ORDINARY and BLOOM YOUR OWN WAY; decide STILL BECOMING (pink crop) and featured order.

## Verification
- npx astro build: pass. GET /admin-vora (dev): 200.
