import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.daleas-danse.fr',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
