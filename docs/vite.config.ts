import path from 'path';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import {
  GitChangelog,
  GitChangelogMarkdownSection
} from '@nolebase/vitepress-plugin-git-changelog/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { genApiDoc } from './.vitepress/plugin/api-doc.config';

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
        'ksw-ux': [
          /packages\/(components|templates|utils|style|interface|element-plus.ts)/,
          /vue-i18n/
        ],
        'ksw-icon': [/ksw-vue-icon/]
        // '@nolebase': [/@nolebase/],
      }
    }),
    GitChangelog({
      repoURL: () => 'https://github.com/xiyure/k-component-lib',
      mapAuthors: [
        {
          name: 'mobytang',
          username: 'baobaomi900901',
          mapByEmailAliases: [
            'tangqingwei@kingsware.cn',
            'baobaomi900901@icloud.com',
            'lugs@kingsware.cn',
          ],
        },
        {
          name: '周韩杰',
          username: 'xiyure',
          mapByEmailAliases: [
            'zhouhanjie@kingsware.cn',
            '100740223+xiyure@users.noreply.github.com',
          ],
        },
        {
          name: '莫启健',
          username: 'QijianMo',
          mapByEmailAliases: [
            'moqijian@kingsware.cn',
            'qijian_mo@163.com',
          ],
        },
      ],
    }),
    GitChangelogMarkdownSection({
      exclude: (id) => {
        const excludedFiles = ['index.md', 'CHANGELOG.md', 'team.md'];
        return excludedFiles.some((file) => id.endsWith(file));
      },
      sections: {
        disableChangelog: true,
        disableContributors: false
      }
    }),
    visualizer()
  ],
  server: {
    host: '0.0.0.0',
    port: 12581
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  // manualChunks(id) {
  //   if (id.includes('packages/components')) {
  //     console.log(id);
  //     return id.toString().split('packages/')[1].split('/')[0].toString();
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
      '@example': path.resolve(__dirname, './example')
    }
  },
  optimizeDeps: {
    exclude: ['@nolebase/vitepress-plugin-enhanced-readabilities/client', 'vitepress']
  },
  ssr: {
    noExternal: ['ksw-vue-icon', '@ksware/ksw-ux', 'vue-i18n', '@nolebase/*']
  }
});
