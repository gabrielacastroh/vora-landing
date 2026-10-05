import { getCollection, type CollectionEntry } from 'astro:content';
import productsFile from './products.json';

export type Product = CollectionEntry<'products'>['data'] & { slug: string };

/** Every product, in products.json order (getCollection() orders by id, so the file sets it). */
export async function getProducts(): Promise<Product[]> {
  const fileOrder = productsFile.map((p) => p.id);
  const entries = await getCollection('products');
  return entries.map((entry) => ({ slug: entry.id, ...entry.data })).sort((a, b) => fileOrder.indexOf(a.slug) - fileOrder.indexOf(b.slug));
}

/** Products flagged `featured` in products.json, in that order (home groups them by `line`). */
export async function getFeatured(): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.featured).sort((a, b) => a.featured! - b.featured!);
}

/** Products of one /coleccion group, in products.json order (that order is the 01, 02… numbering). */
export async function getLine(line: NonNullable<Product['line']>): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.line === line);
}

export type Detail = CollectionEntry<'details'>['data'] & { id: string };

const byId = <T extends { id: string }>(a: T, b: T) => a.id.localeCompare(b.id);

export async function getDetails(): Promise<Detail[]> {
  return (await getCollection('details')).sort(byId).map(({ id, data }) => ({ id, ...data }));
}
