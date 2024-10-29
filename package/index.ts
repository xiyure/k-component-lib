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
import * as originComponents from './element-plus';
import * as directives from './directives';
import zh from './internal/zh';
import en from './internal/en';
import { Emitter } from './utils';
import './style/tailwind.css';
// import './style/theme/AOM/theme.css';
// import './style/theme/GFAOM/theme.css';
import 'overlayscrollbars/styles/overlayscrollbars.css'; // 引入overlayscrollbars样式

type optionsType = {
  locale?: 'zh' | 'en';
  vxeGlobalConfig?: VxeGlobalConfig;
  ElementPlusOptions?: any;
  styleModule?: string;
};
// 组件和模板添加install方法
for (const name in components) {
  const comp = components[name];
  comp.install = function (app: any) {
    app.component(comp.name, comp);
  };
}
for (const name in templates) {
  const tmpl = templates[name];
  tmpl.install = function (app: any) {
    app.component(tmpl.name, tmpl);
  };
}

// install方法
const install = (app: any, options?: optionsType) => {
  handleProjectStyle(options?.styleModule);
  app.use(ElementPlus, {
    ...options?.ElementPlusOptions,
    locale: options?.locale === 'en' ? enLocal : zhLocal,
  });
  // 国际化
  registerInternal(app, options);
  // 组件注册
  registerComponent(app);
  app.use(VxeTable).use(VxeUI);
  // 设置vxe-table全局配置
  VxeUI.setConfig(options?.vxeGlobalConfig ?? {});
  // 自定义指令注册
  for (const name in directives) {
    app.directive(`ksw_${name}`, directives[name]);
  }
  // 全局事件管理，用于多级组件之间的通信
  app.provide('_emitter', new Emitter());
  // styleModule
  app.provide('_styleModule', options?.styleModule ?? '');
};

function registerComponent(app: any) {
  // 组件注册
  for (const name in components) {
    app.component(name, components[name]);
  }
  // 模板组件注册
  for (const name in templates) {
    app.component(name, templates[name]);
  }
  // 原生组件注册
  for (const name in originComponents) {
    app.component(name, originComponents[name]);
  }
}

function registerInternal(app: any, options?: optionsType) {
  const messages = { zh, en };
  const i18n = createI18n({
    locale: options?.locale === 'en' ? 'en' : 'zh',
    messages,
  });
  app.use(i18n);
  // i18n
  app.provide('$t', i18n.global.t);
}

function handleProjectStyle(styleModule: string | undefined) {
  const projectList = ['AOM', 'GFAOM'];
  let projectName = 'AOM';
  if (typeof styleModule === 'string' && projectList.includes(styleModule)) {
    projectName = styleModule;
  } else if (styleModule !== undefined) {
    console.warn(
      `'styleModule' expected to be ${projectList.map((name) => `'${name}'`).join(' or ')}, but got '${styleModule}'.`,
    );
  }
  // 项目样式导入
  import(`./style/theme/${projectName}/theme.css`);
}

export * from './components';
export * from './element-plus';
export * from './templates';
export default install;
