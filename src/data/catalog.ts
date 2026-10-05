import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Product = CollectionEntry<'products'>['data'] & { slug: string };

/** Every product, in catalog order (by slug: vora-01, vora-02, …). */
export async function getProducts(): Promise<Product[]> {
  const entries = await getCollection('products');
  return entries.map((entry) => ({ slug: entry.id, ...entry.data })).sort((a, b) => a.slug.localeCompare(b.slug));
}

/** Products flagged `featured` in products.json, in that order. */
export async function getFeatured(): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.featured).sort((a, b) => a.featured! - b.featured!);
}

export type Look = Omit<CollectionEntry<'lookbook'>['data'], 'product'> & { slug: string; name: string };
export type Detail = CollectionEntry<'details'>['data'] & { id: string };

const byId = <T extends { id: string }>(a: T, b: T) => a.id.localeCompare(b.id);

/** Lookbook portraits with their product resolved (name + slug for the link). */
export async function getLookbook(): Promise<Look[]> {
  const entries = (await getCollection('lookbook')).sort(byId);
  return Promise.all(
    entries.map(async ({ id, data: { product: ref, ...look } }) => {
      const product = await getEntry(ref);
      if (!product) throw new Error(`lookbook.json "${id}": unknown product "${ref.id}"`);
      return { ...look, slug: product.id, name: product.data.name };
    }),
  );
}

export async function getDetails(): Promise<Detail[]> {
  return (await getCollection('details')).sort(byId).map(({ id, data }) => ({ id, ...data }));
}
