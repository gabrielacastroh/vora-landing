import { getImage } from 'astro:assets';

/**
 * `srcset` of WebP renditions served by the image service (Vercel in production, sharp in dev).
 * Components are sync TSX, so the async work lives here and results travel as plain strings.
 * Widths must be in the Vercel service's `sizes` (640, 750, 828, 1080, 1200, 1920, ...): it snaps to those
 * and rejects others in production. Quality 75 sits inside Vercel's allowed set (the adapter default of 100 is heavy).
 * Widths at or above the source width are skipped (never upscale); undefined when none remain,
 * so callers fall back to the plain `src`.
 */
export async function srcSet(img: ImageMetadata, widths: number[]): Promise<string | undefined> {
  const usable = widths.filter((w) => w < img.width);
  if (!usable.length) return undefined;
  const parts = await Promise.all(
    usable.map(async (width) => `${(await getImage({ src: img, width, format: 'webp', quality: 75 })).src} ${width}w`),
  );
  return parts.join(', ');
}
