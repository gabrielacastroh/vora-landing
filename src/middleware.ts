import { defineMiddleware } from 'astro:middleware';
import { isAuthed } from './lib/admin-auth';

// Everything except the public landing (/) and the login at /admin-vora.
const GATED = /^\/(coleccion|producto)(\/|$)/;

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const inAdmin = pathname === '/admin-vora' || pathname.startsWith('/admin-vora/');
  if (!inAdmin && !GATED.test(pathname)) return next();

  if (!inAdmin && !(await isAuthed(context.cookies))) return context.redirect('/admin-vora');

  const response = await next();
  // Gated HTML must never be cached by a CDN or shared proxy.
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
});
