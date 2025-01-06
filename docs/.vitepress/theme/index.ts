import { h, onMounted } from 'vue';
import DefaultTheme from 'vitepress/theme';
import { Container } from '../plugin/container/index';
import './style.less';
import './tailwind.css';
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
import { KswIcon } from 'ksw-vue-icon';
/*
 *  源码
 */
import install from '../../../packages/index';
/*
 *  本地 build
 */
// import install from '../../../kingsware-ui/index';
// import '../../../kingsware-ui/style.css';
/*
 *  npm
 */
// import install from '@ksware/ksw-ux';
// import '@ksware/ksw-ux/kingsware-ui/style.css';

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 为较宽的屏幕的导航栏添加阅读增强菜单
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
    });
  },
  enhanceApp(ctx) {
    // 注入第三方库
    DefaultTheme.enhanceApp(ctx);
    if (typeof window !== 'undefined') {
      document.addEventListener('DOMContentLoaded', async () => {
        ctx.app.use(install);
        ctx.app.use(KswIcon);
        ctx.app.use(NolebaseGitChangelogPlugin);
        ctx.app.component('demo-preview', Container);
        ctx.app.component('DocTitle', DocTitle);
        ctx.app.provide(InjectionKey, {
          // 配置
          layoutSwitch: {
            disableAnimation: false,
            defaultMode: 1,
          },
          spotlight: {
            defaultToggle: true,
          },
        } as Options);
      });
    }
  },
  setup() {
  onMounted(() => {
  // 选择所有具有滚动条的元素
  const scrollableElements = document.querySelectorAll(
    'body, aside, pre, div[class="vxe-table--body-wrapper body--wrapper"]',
  );
  // 对每个元素初始化 OverlayScrollbars
  scrollableElements.forEach((element) => {
    OverlayScrollbars(element, {
      // 这里可以设置 OverlayScrollbars 的选项
      update: {
        elementEvents: [
          ['img', 'load'],
          ['ul[id="localsearch-list"]', 'load']
        ]
      },
      scrollbars: {
        // theme: 'os-theme-dark',
        autoHide: 'move', // 是否在某个用户操作之后自动隐藏可见的滚动条。有效值为：'never'、'scroll'和'leave', 'move'
        autoHideSuspend: false //暂停自动隐藏功能，直到执行第一次滚动交互。
      }
    });
  });
  });
  },
};
