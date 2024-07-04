import ElementPlus from 'element-plus';
import VXETable from 'vxe-table';
import zhLocal from 'element-plus/es/locale/lang/zh-cn';
import enLocal from 'element-plus/es/locale/lang/en';
import 'element-plus/dist/index.css';
import 'vxe-table/lib/style.css';
import 'ksw-vue-icon/styles/icon.css';
import './style/font.less';
import { createI18n } from 'vue-i18n';
import * as components from './components';
import * as directives from './directives';
import zh from './internal/zh';
import en from './internal/en';
import { Emitter } from './utils';
import { KswIcon } from 'ksw-vue-icon';

type optionsType = {
  locale?: 'zh' | 'en';
};
const install = (Vue: any, options?: optionsType) => {
  // 国际化
  const messages = { zh, en };
  const i18n = createI18n({
    locale: options?.locale === 'en' ? 'en' : 'zh',
    messages
  });
  Vue.use(ElementPlus, {
    locale: options?.locale === 'en' ? enLocal : zhLocal
  });
  Vue.use(VXETable);
  Vue.use(i18n);
  // 组件注册
  for (const name in components) {
    Vue.component(name, components[name]);
  }
  // 自定义指令注册
  for (const name in directives) {
    Vue.directive(`ksw_${name}`, directives[name]);
  }
  // 全局事件管理，用于多级组件之间的通信
  Vue.config.globalProperties.__emitter__ = new Emitter();
  Vue.config.globalProperties.$t = i18n.global.t;

  Vue.use(KswIcon); // 图标组件注册
};

export * from './components';
export default install;
