import { h, onMounted } from 'vue';
import DefaultTheme from 'vitepress/theme';
import '@ksware/ksw-ux/kingsware-ui/style.css';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
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
import type { Options } from '@nolebase/vitepress-plugin-enhanced-readabilities/client';
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css';
import VxeTable from 'vxe-table';
import VxeUI, { VxeGlobalConfig } from 'vxe-pc-ui';
import DocTitle from '../components/DocTitle.vue';
import { KswIcon } from 'ksw-vue-icon';
/*
 *  npm
 */
import KUI from '@ksware/ksw-ux';
import 'ksw-vue-icon/styles/icon.css';
/*
 *  本地 build
 */
// import KUI from '../../../kingsware-ui/index';
// import '../../../kingsware-ui/style.css';
/*
 *  源码
 */
// import KUI from '../../../package/index';
// import '../../../package/style';

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
    // inject Third-party libraries
    ctx.app.use(KUI);
    ctx.app.use(KswIcon);
    ctx.app.use(VxeTable).use(VxeUI);
    DefaultTheme.enhanceApp(ctx);
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
  },
  setup() {
    onMounted(() => {
      OverlayScrollbars(document.body, {
        // 这里可以设置 OverlayScrollbars 的选项
        // scrollbars: { theme: 'os-theme-dark' },
      });
    });
  },
};
