import DefaultTheme from 'vitepress/theme';
import KUI from '@ksware/ksw-ux';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
import {
  AntDesignContainer,
  ElementPlusContainer,
  NaiveUIContainer,
} from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css';
import '@ksware/ksw-ux/kingsware-ui/style.css'
import './style.css';
import '../../styles/tailwind.css';

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    // inject Third-party libraries
    ctx.app.use(KUI);
    DefaultTheme.enhanceApp(ctx);
    ctx.app.component('demo-preview', ElementPlusContainer);
  },
};
