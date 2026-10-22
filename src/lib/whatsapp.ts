import { site } from '../data/site';

/**
 * Prefilled messages must NOT contain emojis: WhatsApp's landing page (wa.me and api.whatsapp.com/send alike) turns
 * them into U+FFFD, and the chat box receives that (measured in WhatsApp Web with every encoding tried).
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
