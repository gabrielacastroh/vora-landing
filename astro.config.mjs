// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  // One small stylesheet for the whole site: inlining it removes a render-blocking request.
  build: { inlineStylesheets: 'always' },

  vite: {
    plugins: [tailwindcss()]
  }
});