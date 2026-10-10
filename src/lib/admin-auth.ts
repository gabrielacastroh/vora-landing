import { ADMIN_PASSWORD } from 'astro:env/server';
import type { AstroCookies } from 'astro';

const COOKIE = 'vora_admin';
const MAX_AGE = 60 * 60 * 24 * 7;
const enc = new TextEncoder();

/** Session token = HMAC(password, fixed label). Rotating the password invalidates every session. */
async function sessionToken(): Promise<string> {
  const key = await crypto.subtle.importKey('raw', enc.encode(ADMIN_PASSWORD), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode('vora-admin-v1'));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Constant-time compare of two equal-length strings (both are HMAC hex). */
function same(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function isAuthed(cookies: AstroCookies): Promise<boolean> {
  const value = cookies.get(COOKIE)?.value;
  return !!value && same(value, await sessionToken());
}

/** Returns true and sets the session cookie when the password matches. */
export async function login(cookies: AstroCookies, password: string): Promise<boolean> {
  // Hash both sides so the compare is constant-time regardless of length.
  const hash = async (v: string) => new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(v)));
  const [a, b] = await Promise.all([hash(password), hash(ADMIN_PASSWORD)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  if (diff !== 0) {
    // ponytail: fixed delay slows brute force; add real rate limiting (Vercel WAF / KV) if this gets exposed widely.
    await new Promise((r) => setTimeout(r, 800));
    return false;
  }
  cookies.set(COOKIE, await sessionToken(), {
    httpOnly: true,
    secure: !import.meta.env.DEV,
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
  return true;
}
