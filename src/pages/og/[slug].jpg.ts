import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { getListed } from '../../data/catalog';

export const prerender = true;

// Share image of a product (og:image), built once per product at build time: the garment on the product-slide
// background. JPEG at 1200x630 because link previews (WhatsApp above all) are unreliable with WebP.
const WIDTH = 1200;
const HEIGHT = 630;
const BACKGROUND = '#240407';
const DATA_DIR = path.resolve('src/data');

export const getStaticPaths: GetStaticPaths = async () => (await getListed()).map((p) => ({ params: { slug: p.slug } }));

export const GET: APIRoute = async ({ params }) => {
  // The collection hands out the processed image (a URL), so the source file comes from the catalog itself:
  // `cardImage` is stored relative to products.json.
  const products: { id: string; cardImage: string }[] = JSON.parse(await readFile(path.join(DATA_DIR, 'products.json'), 'utf8'));
  const entry = products.find((p) => p.id === params.slug);
  if (!entry) return new Response(null, { status: 404 });
  const garment = await sharp(path.resolve(DATA_DIR, entry.cardImage))
    // Packshots carry uneven transparent margins: drop them so every garment fills the frame alike.
    .trim()
    .resize(WIDTH - 160, HEIGHT - 70, { fit: 'inside' })
    .toBuffer();
  const image = await sharp({ create: { width: WIDTH, height: HEIGHT, channels: 3, background: BACKGROUND } })
    .composite([{ input: garment }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(image), { headers: { 'Content-Type': 'image/jpeg' } });
};
