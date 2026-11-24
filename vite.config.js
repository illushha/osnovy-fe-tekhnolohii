import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const root = fileURLToPath(new URL('.', import.meta.url));
const pages = ['index', ...Array.from({ length: 8 }, (_, i) =>
  'lab-0' + (i + 1) + '/index')];

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map(page => [page, resolve(root, page + '.html')]))
    }
  }
});
