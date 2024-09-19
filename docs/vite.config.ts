import { defineConfig } from 'vite';
import { genApiDoc } from './.vitepress/plugin/api-doc.config';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    genApiDoc(),
  ],
  server: {
    host: '0.0.0.0',
    port: 12581,
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  optimizeDeps: {
    exclude: [
      '@nolebase/vitepress-plugin-enhanced-readabilities/client',
      'vitepress',
    ],
  },
  ssr: {
    noExternal: ['ksw-vue-icon', '@ksware/ksw-ux', 'vue-i18n', '@nolebase/*'],
  },
});
