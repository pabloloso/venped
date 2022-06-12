import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcss from './postcss.config.js';

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  css: {
    postcss,
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
  },
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => val.replace(/^~/, ''),
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
