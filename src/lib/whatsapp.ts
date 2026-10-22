import { site } from '../data/site';

/** wa.me link with an optional prefilled message; '' while the number isn't configured. */
export function waUrl(base: string, text?: string): string {
  if (!base) return '';
  return text ? `${base}${base.includes('?') ? '&' : '?'}text=${encodeURIComponent(text)}` : base;
}

/** The brand-wide chat link (floating button, footer icon, contact card) with the general greeting. */
export const generalWhatsapp = () => waUrl(site.social.whatsapp, site.contact.whatsappMessage);
