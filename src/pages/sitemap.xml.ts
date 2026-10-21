import type { APIRoute } from 'astro';
import { getListed } from '../data/catalog';

export const prerender = true;

const escapeXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async ({ site }) => {
  const paths = ['/', '/coleccion', '/nosotros', '/contacto', '/politica-de-privacidad', ...(await getListed()).map((p) => `/producto/${p.slug}`)];
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = paths
    .map((p) => `  <url><loc>${escapeXml(new URL(p, site).href)}</loc><lastmod>${lastmod}</lastmod></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
