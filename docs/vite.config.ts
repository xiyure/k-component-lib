import { defineConfig } from 'vite';
import { genApiDoc } from './.vitepress/plugin/api-doc.config';

export default defineConfig({
  plugins: [
    genApiDoc(),
  ],
  server: {
    host: '0.0.0.0',
    port: 12581,
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
