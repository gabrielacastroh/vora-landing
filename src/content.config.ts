import { defineCollection } from 'astro:content';
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
      /** Collection-page group. Omit to leave the product out of /coleccion. */
      line: z.enum(['unisex', 'womens']).optional(),
      /** Garment on its own: collection/home cards and the first product slide. */
      cardImage: image(),
      /** Full-bleed product photos (Figma vora-1-N). Shown after the packshot; when set, heroImage is ignored. */
      gallery: z.array(z.object({ image: image(), position: z.string().optional() })).nonempty().optional(),
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

export const collections = { products, details };
