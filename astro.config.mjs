// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Canonical production origin (apex redirects to www).
  site: 'https://www.vora-col.com',
  // Server output kept for the Vercel adapter; every page opts into prerendering.
  output: 'server',
  adapter: vercel({ imageService: true }),
  integrations: [react()],

  redirects: { '/expectativa': '/', '/admin-vora': '/' },

  // One small stylesheet for the whole site: inlining it removes a render-blocking request.
  build: { inlineStylesheets: 'always' },

  vite: {
    plugins: [tailwindcss()],
    resolve: { alias: { rolldown: fileURLToPath(new URL('./src/lib/rolldown-stub.mjs', import.meta.url)) } },
  }
});
