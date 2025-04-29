import path from 'path';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {
  GitChangelog,
  GitChangelogMarkdownSection
} from '@nolebase/vitepress-plugin-git-changelog/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { genApiDoc } from './.vitepress/plugin/api-doc.config';

export default defineConfig({
  plugins: [
    genApiDoc(),
    vueJsx(),
    GitChangelog({
      repoURL: () => 'https://github.com/xiyure/k-component-lib',
      mapAuthors: [
        {
          name: 'mobytang',
          username: 'baobaomi900901',
          mapByEmailAliases: [
            'tangqingwei@kingsware.cn',
            'baobaomi900901@icloud.com',
            'lugs@kingsware.cn'
          ]
        },
        {
          name: '周韩杰',
          username: 'xiyure',
          mapByEmailAliases: [
            'zhouhanjie@kingsware.cn',
            '100740223+xiyure@users.noreply.github.com'
          ]
        },
        {
          name: '莫启健',
          username: 'QijianMo',
          mapByEmailAliases: ['moqijian@kingsware.cn', 'qijian_mo@163.com']
        }
      ]
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
    include: ['gsap', '**/*/DrawSVGPlugin.min.js'],
    exclude: ['@nolebase/vitepress-plugin-enhanced-readabilities/client']
  },
  ssr: {
    noExternal: ['gsap', 'gsap/ScrollTrigger', '@ksware/ksw-ux', 'ksw-vue-icon', '@nolebase/*']
  }
});
