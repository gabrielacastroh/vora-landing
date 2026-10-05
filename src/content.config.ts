import { defineCollection, reference } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

// Single source of truth for the catalog: src/data/products.json. The build fails if an entry
// is malformed or points at an image that does not exist.
const products = defineCollection({
  loader: file('src/data/products.json'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      variant: z.string(),
      /** Garment on its own: collection/home cards and the first product slide. */
      cardImage: image(),
      /** Model wearing it: second product slide. Omit when there is no model shot yet. */
      heroImage: image().optional(),
      /** object-position for heroImage, to keep the model in frame. */
      heroPosition: z.string().optional(),
      /** Position in the home "Colección destacada" row (1 = first). Omit to leave it out. */
      featured: z.number().int().positive().optional(),
      description: z.string(),
      details: z.array(z.object({ label: z.string(), value: z.string() })),
      sizes: z.array(z.string()).nonempty(),
    }),
});

/** Figma mask framing: image rect [x, y, width, height] relative to the visible window. Omit to fill. */
const frame = z.tuple([z.number(), z.number(), z.number(), z.number()]).optional();

// Lookbook portraits on /coleccion. `product` must be an id from products.json; its name and link
// come from the catalog.
const lookbook = defineCollection({
  loader: file('src/data/lookbook.json'),
  schema: ({ image }) =>
    z.object({
      product: reference('products'),
      tag: z.string(),
      image: image(),
      frame,
    }),
});

// "Detalles de la colección" cards on /coleccion.
const details = defineCollection({
  loader: file('src/data/details.json'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Rendered one per line. */
      lines: z.array(z.string()).nonempty(),
      image: image(),
      frame,
    }),
});

export const collections = { products, lookbook, details };
