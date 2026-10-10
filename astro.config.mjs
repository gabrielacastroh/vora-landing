// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Server output so the middleware can gate /admin-vora, /coleccion and /producto/*.
  // The public landing (src/pages/index.astro) opts back into prerendering.
  output: 'server',
  adapter: vercel(),
  integrations: [react()],

  redirects: { '/expectativa': '/' },

  env: {
    schema: {
      ADMIN_PASSWORD: envField.string({ context: 'server', access: 'secret' }),
    },
  },

  // One small stylesheet for the whole site: inlining it removes a render-blocking request.
  build: { inlineStylesheets: 'always' },

  vite: {
    plugins: [tailwindcss()]
  }
});
