import type { App } from 'vue';
import type { ContextConfig } from '../utils/typescript';
import { mergeCssVar, setStyleTheme } from '../utils';
import '../style/elStyle/index.css';
import 'vxe-table/lib/style.css';
import '../variable.css';
import '../general.less';
import 'ksw-vue-icon/styles/icon.css';
import '../style/tailwind.css';
import 'overlayscrollbars/styles/overlayscrollbars.css';
import '../style/theme/index.css';

// style of lib
export function registerStyle(_app: App, config: ContextConfig = {}) {
  setStyleTheme(config.styleModule);
  // 合并css变量
  mergeCssVar(config.cssVariables);
}
