import { defineConfig } from 'vitepress';
import nav from './configs/nav';
import { generateRewrites, sidebarRewrites } from './plugin/rewritePath';
import { containerPreview, componentPreview } from '../.vitepress/plugin/demo-preview';
import { fileURLToPath, URL } from 'node:url';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'ksw-ux',
  description: 'ksw-ux 是一个基于 Element-Plus 的 UI 组件库',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/klogo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh' }],
    [
      'meta',
      {
        property: 'og:title',
        content: 'KSW Design | 基于 KSW Design 设计体系的 Vue3 组件库，用于研发企业级中后台产品。',
      },
    ],
    ['meta', { property: 'og:site_name', content: 'KSW Design' }],
  ],
  markdown: {
    config: (md) => {
      md.use(containerPreview);
      md.use(componentPreview);
    },
    image: {
      lazyLoading: true,
    },
  },
  cleanUrls: true,
  rewrites: {
    ...generateRewrites(),
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,

    sidebar: {
      ...sidebarRewrites(),
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/xiyure/k-component-lib' }],

    logo: { src: '/klogo.svg', width: 24, height: 24 },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      level: 'deep',
      label: '页面导航',
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
        // disableDetailedView: true,
        detailedView: true,
      },
    },
  },
  vite: {
    plugins: [],
    resolve: {
      alias: [
        {
          find: /^.*\/VPHome\.vue$/,
          replacement: fileURLToPath(new URL('./templates/CVPHome.vue', import.meta.url)),
        },
      ],
    },
  },
});
