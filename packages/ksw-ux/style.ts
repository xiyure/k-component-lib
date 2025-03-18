import type { App } from 'vue';
import type { ContextConfig } from '../utils/typescript';
import { mergeCssVar, setStyleTheme } from '../utils';
import 'element-plus/dist/index.css';
import 'vxe-table/lib/style.css';
import 'ksw-vue-icon/styles/icon.css';
import '../style/tailwind.css';
import 'overlayscrollbars/styles/overlayscrollbars.css';
import '../style/theme/index.css';
import '../style/global.less';

// style of lib
export function registerStyle(app: App, config: ContextConfig = {}) {
  const styleModule = setStyleTheme(config.styleModule);;
  app.provide('_styleModule', styleModule);
  // 合并css变量
  mergeCssVar(config.cssVariables);
}
