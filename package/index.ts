import ElementPlus from 'element-plus';
import VxeTable from 'vxe-table';
import VxeUI, { VxeGlobalConfig } from 'vxe-pc-ui';
import zhLocal from 'element-plus/es/locale/lang/zh-cn';
import enLocal from 'element-plus/es/locale/lang/en';
import 'element-plus/dist/index.css';
import 'vxe-table/lib/style.css';
import 'ksw-vue-icon/styles/icon.css';
import { createI18n } from 'vue-i18n';
import * as components from './components';
import * as templates from './templates';
import originComponents from './element-plus';
import * as directives from './directives';
import zh from './internal/zh';
import en from './internal/en';
import { Emitter } from './utils';

type optionsType = {
  locale?: 'zh' | 'en';
  vxeGlobalConfig?: VxeGlobalConfig;
};
const install = (Vue: any, options?: optionsType) => {
  // 国际化
  const messages = { zh, en };
  const i18n = createI18n({
    locale: options?.locale === 'en' ? 'en' : 'zh',
    messages,
  });
  Vue.use(ElementPlus, {
    locale: options?.locale === 'en' ? enLocal : zhLocal,
  });
  // 组件注册
  for (const name in components) {
    Vue.component(name, components[name]);
  }
  // 模板组件注册
  for (const name in templates) {
    Vue.component(name, templates[name]);
  }
  for (const name in originComponents) {
    Vue.component(name, originComponents[name]);
  }
  Vue.use(VxeTable).use(VxeUI);
  // 设置vxe-table全局配置
  VxeUI.setConfig(options?.vxeGlobalConfig ?? {});
  Vue.use(i18n);
  // 自定义指令注册
  for (const name in directives) {
    Vue.directive(`ksw_${name}`, directives[name]);
  }
  // 全局事件管理，用于多级组件之间的通信
  Vue.config.globalProperties.__emitter__ = new Emitter();
  Vue.config.globalProperties.$t = i18n.global.t;
};

export * from './components';
export * from './templates';
export default install;
