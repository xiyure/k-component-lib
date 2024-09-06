import DefaultTheme from 'vitepress/theme';
import ElementPlus from 'element-plus';
import VxeTable from 'vxe-table';
import VxeUI from 'vxe-pc-ui';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
import {
  AntDesignContainer,
  ElementPlusContainer,
  NaiveUIContainer,
} from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css';
import './style.css';
import * as components from '../../../package/components';
import '../../../tailwind.css';

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    // inject Third-party libraries
    ctx.app.use(ElementPlus).use(VxeTable).use(VxeUI);
    DefaultTheme.enhanceApp(ctx);
    ctx.app.component('demo-preview', ElementPlusContainer);
    for (const name in components) {
      ctx.app.component(name, components[name]);
    }
  },
};
