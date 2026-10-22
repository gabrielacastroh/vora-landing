import { site } from '../data/site';

/**
 * Messages are written WITH emojis, but WhatsApp's landing page (wa.me and api.whatsapp.com/send alike) turns every
 * emoji in `text` into U+FFFD (measured in WhatsApp Web with every encoding tried). So the href stays emoji-free
 * (plainText) and the emoji version rides in `data-wa-text`; on mobile motion.ts opens the native
 * `whatsapp://send` deep link with it, which the app decodes itself.
 * `base` is the plain wa.me/<number> link from site.json.
 */
const phone = (base: string) => new URL(base).pathname.replace(/\D/g, '');

export function waSend(base: string): string {
  if (!base) return '';
  return `https://api.whatsapp.com/send?phone=${phone(base)}`;
}

/** Strips emojis (and their joiners/selectors) and tidies the spaces they leave behind. */
export const plainText = (msg: string) =>
  msg
    .replace(/[\p{Extended_Pictographic}\u200D\uFE0F]/gu, '')
    .replace(/ {2,}/g, ' ')
    .trim();

/** Chat link with an optional prefilled message (emojis stripped); '' while the number isn't configured. */
export function waUrl(base: string, text?: string): string {
  if (!base) return '';
  return text ? `${waSend(base)}&text=${encodeURIComponent(plainText(text))}` : base;
}

/** Data attributes for the anchor so motion.ts can open the emoji message through the app's deep link. */
export function waData(base: string, text: string): Record<string, string> {
  return base ? { 'data-wa-phone': phone(base), 'data-wa-text': text } : {};
}

/** The brand-wide chat link (floating button, footer icon, contact card) with the general greeting. */
export const generalWhatsapp = () => waUrl(site.social.whatsapp, site.contact.whatsappMessage);
export const generalWaData = () => waData(site.social.whatsapp, site.contact.whatsappMessage);
