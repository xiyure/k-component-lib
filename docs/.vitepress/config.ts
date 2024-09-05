import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import nav from '../configs/nav'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import sidebar from '../configs/sidebar'

export default defineConfig({
  // lang: 'en-US',
  title: 'ksw-ux',
  description: 'ksw-ux 是一个基于 Element-Plus 的 UI 组件库',

  lastUpdated: true,
  cleanUrls: true,

  base: process.env.BASE || '/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
  ],

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },

    config: (md) => {
      md.use(containerPreview);
      md.use(componentPreview);
    }
  },

  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: {
        '@alias': path.resolve(__dirname, '../')
      }
    }
  },

  themeConfig: {
    outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',
    logo: '/logo.svg',

    search: {
      provider: 'local',
      // provider: 'algolia',
      // options: {
      //   appId: 'X51HWTCQJJ',
      //   apiKey: 'ca20f15eb8a667898b65d13f4213ae3d',
      //   indexName: 'vitepress-demo'
      // }
    },

    nav,
    sidebar,

    // editLink: {
    //   pattern: 'https://github.com/xinlei3166/vitepress-demo/edit/master/docs/:path',
    //   text: '在 GitHub 上编辑此页'
    // },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiyure/k-component-lib' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present ZHJ'
    }
  }
})
