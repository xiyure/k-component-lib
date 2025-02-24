import type { App } from 'vue';
import ElementPlus from 'element-plus';
import zhLocal from 'element-plus/es/locale/lang/zh-cn';
import enLocal from 'element-plus/es/locale/lang/en';
import zhCN from 'vxe-table/es/locale/lang/zh-CN';
import enUS from 'vxe-table/es/locale/lang/en-US';
import VxeTable from 'vxe-table';
import VxeUI from 'vxe-pc-ui';
import type { ContextConfig } from '../utils/typescript';

// import the third-party library
export function importThirdLib(app: App, config: ContextConfig = {}) {
  app.use(ElementPlus, {
    ...config?.ElementPlusOptions,
    locale: config.locale === 'en' ? enLocal : zhLocal
  });
  app.use(VxeTable).use(VxeUI);
  VxeUI.setConfig(config.vxeGlobalConfig ?? {});
  VxeUI.setI18n('zh-CN', zhCN);
  VxeUI.setI18n('en-US', enUS);
}