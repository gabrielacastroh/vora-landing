import { getCollection, type CollectionEntry } from 'astro:content';
import { srcSet } from '../lib/srcset';

const CARD_WIDTHS = [640, 1080];
const PHOTO_WIDTHS = [640, 1080, 1920];

/** `srcset` strings for the card image and for each product photo (gallery, else the model shot), in slide order. */
export type ProductSets = { card?: string; /** The card image at slide size (first product slide). */ slide?: string; photos: (string | undefined)[] };

export type Product = CollectionEntry<'products'>['data'] & { slug: string; sets: ProductSets };

/** Every product, by `order` (glob() makes no ordering guarantee). */
export async function getProducts(): Promise<Product[]> {
  const entries = await getCollection('products');
  const products = await Promise.all(
    entries.map(async (entry) => {
      const { cardImage, gallery, heroImage } = entry.data;
      const photos = gallery?.length ? gallery.map((g) => g.image) : heroImage ? [heroImage] : [];
      const sets: ProductSets = {
        card: await srcSet(cardImage, CARD_WIDTHS),
        slide: await srcSet(cardImage, PHOTO_WIDTHS),
        photos: await Promise.all(photos.map((p) => srcSet(p, PHOTO_WIDTHS))),
      };
      return { slug: entry.id, ...entry.data, sets };
    }),
  );
  return products.sort((a, b) => a.order - b.order);
}

/** Products flagged `featured`, in that order (home groups them by `line`). */
export async function getFeatured(): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.featured).sort((a, b) => a.featured! - b.featured!);
}

/** Products of one /coleccion group, by `order` (that order is the 01, 02… numbering). */
/** Products shown in the store (they belong to a line). The rest stay in src/data/products but have no public page. */
export async function getListed(): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.line);
}

export async function getLine(line: NonNullable<Product['line']>): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.line === line);
}

export type Detail = Omit<CollectionEntry<'details'>['data'], 'frame'> & {
  id: string;
  /** Image rect [x, y, width, height]; undefined when any value is unset (the image then fills). */
  frame?: [number, number, number, number];
};

/** Every detail card, by `order`. */
export async function getDetails(): Promise<Detail[]> {
  const entries = await getCollection('details');
  return entries
    .sort((a, b) => a.data.order - b.data.order)
    .map(({ id, data: { frame: f, ...data } }) => {
      const rect = f && [f.x, f.y, f.width, f.height];
      return { id, ...data, frame: rect?.every((n) => n !== null) ? (rect as [number, number, number, number]) : undefined };
    });
}
