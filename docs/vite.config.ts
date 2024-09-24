import path from 'path';
import { defineConfig } from 'vite';
import { genApiDoc } from './.vitepress/plugin/api-doc.config';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [genApiDoc(), vueJsx()],
  server: {
    host: '0.0.0.0',
    port: 12581,
  },
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './api'),
      '@assets': path.resolve(__dirname, './assets'),
      '@components': path.resolve(__dirname, './components'),
      '@data': path.resolve(__dirname, './data'),
      '@docs': path.resolve(__dirname, './docs'),
      '@example': path.resolve(__dirname, './example'),
    },
  },
  optimizeDeps: {
    exclude: ['@nolebase/vitepress-plugin-enhanced-readabilities/client', 'vitepress'],
  },
  ssr: {
    noExternal: ['ksw-vue-icon', '@ksware/ksw-ux', 'vue-i18n', '@nolebase/*'],
  },
});
