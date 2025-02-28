import { h, onMounted } from 'vue';
import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress'
// import { Container } from '../plugin/container/index';
import { demo } from '../plugin/demo';
import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbars } from 'overlayscrollbars';
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
  InjectionKey,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client';
import type { Options } from '@nolebase/vitepress-plugin-git-changelog/client';
import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client';
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css';
import '@nolebase/vitepress-plugin-git-changelog/client/style.css';
import DocTitle from '../components/DocTitle.vue';
import '@ksware/ksw-ux/kingsware-ui/style.css'; //使用 cdn 导入
import './style.less';
import './tailwind.css';

export default {
  // 扩展默认主题
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 为较宽的屏幕的导航栏添加阅读增强菜单
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
    });
  },
  async enhanceApp({app}) {
    // 注入第三方库
    // 有条件地导入并注册访问浏览器 API 的 Vue 插件
    if (!import.meta.env.SSR) {
      const kswUx = await import('@ksware/ksw-ux')
      const KswIcon = await import('ksw-vue-icon')
      app.use(kswUx.default)
      app.use(KswIcon.KswIcon)
      app.use(NolebaseGitChangelogPlugin);
    }
    // app.component('demo-preview', Container);
    app.component('demo', demo);  //使用新的 demo 组件
    app.component('DocTitle', DocTitle);
    app.provide(InjectionKey, {
      // 配置
      layoutSwitch: {
        disableAnimation: false,
        defaultMode: 1,
      },
      spotlight: {
        defaultToggle: true,
      },
    } as Options);
  },
  setup() {
    onMounted(() => {
      // 选择所有具有滚动条的元素
      const scrollableElements = document.querySelectorAll('body, aside');
      // 对每个元素初始化 OverlayScrollbars
      scrollableElements.forEach((element) => {
        OverlayScrollbars(element, {
          // 这里可以设置 OverlayScrollbars 的选项
          scrollbars: {
            // theme: 'os-theme-dark',
            autoHide: 'move', // 是否在某个用户操作之后自动隐藏可见的滚动条。有效值为：'never'、'scroll'和'leave', 'move'
            autoHideSuspend: true, //暂停自动隐藏功能，直到执行第一次滚动交互。
          },
        });
      });
    });
  },
} satisfies Theme;
