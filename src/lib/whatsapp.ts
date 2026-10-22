import { site } from '../data/site';

/**
 * Links with a prefilled message use api.whatsapp.com/send, not wa.me: the wa.me landing replaces every emoji in
 * `text` with U+FFFD before handing it to the app (measured), while api.whatsapp.com/send keeps them intact.
 * `base` is the plain wa.me/<number> link from site.json.
 */
export function waSend(base: string): string {
  if (!base) return '';
  return `https://api.whatsapp.com/send?phone=${new URL(base).pathname.replace(/\D/g, '')}`;
}

/** Chat link with an optional prefilled message; '' while the number isn't configured. */
export function waUrl(base: string, text?: string): string {
  if (!base) return '';
  return text ? `${waSend(base)}&text=${encodeURIComponent(text)}` : base;
}

/** The brand-wide chat link (floating button, footer icon, contact card) with the general greeting. */
export const generalWhatsapp = () => waUrl(site.social.whatsapp, site.contact.whatsappMessage);
