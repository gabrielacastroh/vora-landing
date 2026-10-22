import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Single source of truth for the catalog: src/data/products/<id>.json (one file per product). The build fails if an entry
// is malformed or points at an image that does not exist.
const products = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/data/products' }),
  schema: ({ image }) =>
    z.object({
      /** false hides the product everywhere public (admin toggle). Omitted = visible. */
      active: z.boolean().default(true),
      /** Position in the catalog (1 = first): sets the /coleccion numbering and the pager order. */
      order: z.number().int().positive(),
      name: z.string(),
      variant: z.string(),
      /** Collection-page group. Omit (or "", what the admin panel writes) to leave the product out of /coleccion. */
      line: z.preprocess((v) => (v === '' ? undefined : v), z.enum(['unisex', 'womens']).optional()),
      /** Garment on its own: collection/home cards and the first product slide. */
      cardImage: image(),
      /** Full-bleed product photos (Figma vora-1-N). Shown after the packshot; when non-empty, heroImage is ignored. */
      gallery: z.array(z.object({ image: image(), position: z.string().optional() })).optional(),
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

/** Figma mask framing: image rect [x, y, width, height] relative to the visible window. Omit, or leave any value null (admin panel), to fill. */
const frame = z
  .object({ x: z.number().nullable(), y: z.number().nullable(), width: z.number().nullable(), height: z.number().nullable() })
  .optional();

// "Detalles de la colección" cards on /coleccion.
const details = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/data/details' }),
  schema: ({ image }) =>
    z.object({
      /** Position on /coleccion (1 = first). */
      order: z.number().int().positive(),
      title: z.string(),
      /** Rendered one per line. */
      lines: z.array(z.string()).nonempty(),
      image: image(),
      frame,
    }),
});

export const collections = { products, details };
