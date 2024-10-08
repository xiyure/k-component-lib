import path from 'path';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { genApiDoc } from './.vitepress/plugin/api-doc.config';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import { GitChangelog, GitChangelogMarkdownSection } from '@nolebase/vitepress-plugin-git-changelog/vite'


export default defineConfig({
  // esbuild: {
  //   minifySyntax: false,
  //   minifyWhitespace: false,
  //   minifyIdentifiers: false,
  // },
  plugins: [
    genApiDoc(),
    vueJsx(),
    chunkSplitPlugin({
      strategy: 'default',
      customSplitting: {
        theme: [/theme\/index/],
        elementPlus: ['element-plus'],
        vxeTable: [/vxe-table/],
        vxePcUi: [/vxe-pc-ui/],
        'ksw-ux': [/package\/(components|templates|utils|style|interface|element-plus.ts)/, /vue-i18n/],
        'ksw-icon': [/ksw-vue-icon/],
        // '@nolebase': [/@nolebase/],
      },
    }),
    GitChangelog({ 
      repoURL: () => 'https://github.com/xiyure/k-component-lib', 
    }), 
    GitChangelogMarkdownSection({ 
      sections: { 
        disableChangelog: true, 
        disableContributors: false, 
      }, 
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 12581,
  },
  // build: {
  //   rollupOptions: {
  //     output: {
        // manualChunks(id) {
        //   if (id.includes('package/components')) {
        //     console.log(id);
        //     return id.toString().split('package/')[1].split('/')[0].toString();
        //   }
        // },
  //     },
  //   },
  // },
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
