import { h, onMounted } from 'vue';
import DefaultTheme from 'vitepress/theme';
import KUI from '@ksware/ksw-ux';
import '@ksware/ksw-ux/kingsware-ui/style.css';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
import {
  AntDesignContainer,
  ElementPlusContainer,
  NaiveUIContainer,
} from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css';
import './style.css';
import '../../styles/index.css';
import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbars } from 'overlayscrollbars';
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client';

import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css';

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
    DefaultTheme.enhanceApp(ctx);
    ctx.app.component('demo-preview', ElementPlusContainer);
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
