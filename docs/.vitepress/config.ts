import { defineConfig } from 'vitepress';
import path from 'path';
import { fileURLToPath, URL } from 'node:url';
import del from 'rollup-plugin-delete';
import { withI18n } from 'vitepress-i18n';
import nav from './configs/nav';
import { generateRewrites, sidebarRewrites } from './plugin/rewritePath';
// import { containerPreview, componentPreview } from './plugin/demo-preview';

// 图标分组计数
let iconCounter = 0;
const iconGroupSize = 150;

// https://vitepress.dev/reference/site-config
const vitePressOptions = {
  lang: 'zh-CN',
  title: 'ksw-ux',
  description: 'ksw-ux 是一个基于 Element-Plus 的 UI 组件库',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/klogo.svg' }],
    // 使用 cdn
    // [
    //   'link',
    //   {
    //     rel: 'preload stylesheet',
    //     href: 'https://cdn.jsdelivr.net/npm/@ksware/ksw-ux/kingsware-ui/style.min.css',
    //     as: 'style',
    //     'data-cdn': 'ksw-css'
    //   }
    // ],
    // 修改 css 顺序
    // [
    //   'script',
    //   {},
    //   `
    //   const kswCssLink = document.querySelector('link[data-cdn="ksw-css"]');
    //   if (kswCssLink) {
    //     document.head.insertBefore(kswCssLink, document.head.firstChild);
    //   } else {
    //     console.error('ksw-css link not found!');
    //   }
    //   `
    // ],
    // meta 信息
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh' }],
    [
      'meta',
      {
        property: 'og:title',
        content: 'KSW Design | 基于 KSW Design 设计体系的 Vue3 组件库，用于研发企业级中后台产品。'
      }
    ],
    ['meta', { property: 'og:site_name', content: 'KSW Design' }]
  ],
  markdown: {
    // config: (md) => {
    //   md.use(containerPreview);
    //   md.use(componentPreview);
    // },
    image: {
      lazyLoading: true
    }
  },
  cleanUrls: true,
  rewrites: {
    ...generateRewrites()
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,

    sidebar: {
      ...sidebarRewrites()
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/xiyure/k-component-lib' }],

    logo: { src: '/klogo.svg', width: 24, height: 24 },

    meilisearch: {
      host: 'https://meilisearch.donxj.com',
      apiKey: '646f90bf02522026b531be2d4d491ba1e2721802f43b72ae72f0a2e5eeca711a',
      indexUid: 'ksw-design'
    },

    // search: {
    //   provider: 'local',
    //   options: {
    //     // disableDetailedView: true,
    //     detailedView: true
    //   }
    // },

    footer: {
      copyright: 'Copyright © 2025 Kingsware Inc. All Rights reserved.'
    }
  },
  sitemap: {
    hostname: 'https://ksw.design.donxj.com'
  },
  assetsDir: 'assets/js',
  metaChunk: true,
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPHome\.vue$/,
          replacement: fileURLToPath(new URL('./templates/CVPHome/CVPHome.vue', import.meta.url))
        },
        {
          find: /^.*\/VPNavBarSearch\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/MeiliSearchBox/MeiliSearchBox.vue', import.meta.url)
          )
        }
      ]
    },
    esbuild: {
      // minifySyntax: false,
      // minifyWhitespace: false,
      // minifyIdentifiers: false,
      drop: ['console', 'debugger']
    },
    build: {
      // cssCodeSplit: true, //拆分 css
      rollupOptions: {
        plugins: [del({ targets: ['./.vitepress/dist/*', './.vitepress/cache/*'], runOnce: true })],
        output: {
          chunkFileNames: 'assets/js/chunks/[name]-[hash].js',
          // entryFileNames: 'assets/js/entries/[name]-[hash].js', //会干扰 VitePress 内部模块解析
          assetFileNames: ({ name }) => {
            if (/\.(woff2?|ttf|eot)$/.test(name ?? '')) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            if (/\.(png|jpe?g|gif|webp|avif)$/.test(name ?? '')) {
              return 'assets/img/[name]-[hash][extname]';
            }
            return 'assets/[ext]/[name]-[hash][extname]';
          },
          manualChunks: (id) => {
            // 拆分 css Chunks 需要开启 cssCodeSplit: true
            // if (/\.(css|less|scss)/.test(id)) {
            //   if (id.includes('ksw-ux/kingsware-ui/style.css')) {
            //     return 'kingsware-ui-style'
            //   }
            //   return 'style'
            // }
            if (id.includes('/docs/docs/') && /\.(vue|vue\?raw)$/.test(id)) {
              // console.log('Processing:', id);
              const parts = id.split(path.sep);
              // 获取目录
              const dir = parts[parts.length - 2];
              // console.log('Chunk Name:', parts);
              return `docsComponents/${dir}`;
            }
            if (id.includes('gsap')) {
              return 'gsap';
            }
            if (id.includes('@ksware/ksw-ux')) {
              return 'ksw-ux/kingsware-ui';
            }
            if (id.includes('ksw-vue-icon')) {
              // runtime 需要独立或者在第一个分组中,不然分包会有循环引用错误
              if (/(runtime)/.test(id)) {
                return 'vendor-core';
              }
              // /ksw-vue-icon\/packages\/(es|cjs)\/icons\/(.+?)\/(?!index)(.+?)\.js/.test(id)
              if (/packages/.test(id)) {
                const chunkIndex = Math.floor(iconCounter / iconGroupSize);
                iconCounter++;
                return `ksw-ux/ksw-vue-icon-chunks-${chunkIndex}`;
              }
              return null;
            }
            if (id.includes('nolebase')) {
              // if (id.includes('git-changelog')) {
              //   if (/git-changelog\/.*(dist|client)/.test(id)) {
              //     return 'nolebase-git-core'
              //   }
              //   return 'nolebase-git'
              // }
              // if (/enhanced-readabilities\/.*(dist|client)/.test(id)) {
              //   return 'nolebase-git-core'
              // }
              return 'nolebase-vitepress-plugin';
            }
            // 将核心依赖分组
            if (/node_modules\/(vue|lodash|react)/.test(id)) {
              return 'vendor-core';
            }
            if (/node_modules\/element-plus\//.test(id)) {
              return 'vendor-ui';
            }
            // if (id.includes('node_modules')) {
            //   // UI库
            //   // 其他依赖
            //   return 'vendor'
            // }
          }
        }
      }
    }
  }
};

const vitePressI18nOptions = {
  locales: ['zhHans'],
  searchProvider: 'local'
};

export default defineConfig(withI18n(vitePressOptions, vitePressI18nOptions));
