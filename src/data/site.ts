import { z } from 'astro/zod';
import data from './site.json';

// Site-wide settings live in site.json. Parsing at import time makes the build fail on a typo
// (missing field, malformed URL) instead of shipping a broken nav or footer.
const link = z.object({ label: z.string(), href: z.string() });
/** Full profile URL, or "" to hide that network until it exists. */
const socialUrl = z.union([z.url(), z.literal('')]);

const schema = z.object({
  name: z.string(),
  /** Default meta description; product pages use their own. */
  description: z.string(),
  pages: z.object({
    home: z.object({ title: z.string() }),
    coleccion: z.object({ title: z.string() }),
  }),
  /** `key` is what a page passes as `active` to highlight its own link. */
  nav: z.array(link.extend({ key: z.string() })),
  footer: z.object({ explora: z.array(link), masDeVora: z.array(link) }),
  social: z.object({ whatsapp: socialUrl, instagram: socialUrl, tiktok: socialUrl }),
});

export const site = schema.parse(data);
export type SocialNetwork = keyof typeof site.social;
