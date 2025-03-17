import type { App } from 'vue';
import { isObject } from 'lodash-es';
import type { ContextConfig } from '@ksw-ux/utils/typescript';
import 'element-plus/dist/index.css';
import 'vxe-table/lib/style.css';
import 'ksw-vue-icon/styles/icon.css';
import '../style/tailwind.css';
import 'overlayscrollbars/styles/overlayscrollbars.css';
import '../style/theme/index.css';
import '../style/global.less';

// style of lib
export function registerStyle(app: App, config: ContextConfig = {}) {
  const styleModule = config.styleModule;
  const projectList = ['AOM', 'GFAOM', 'KingAutometa'];
  let projectName = 'AOM';
  if (typeof styleModule === 'string' && projectList.includes(styleModule)) {
    projectName = styleModule;
  } else if (styleModule !== undefined) {
    console.warn(
      `'styleModule' expected to be ${projectList.map((name) => `'${name}'`).join(' | ')}, but got '${styleModule}'.`
    );
  }
  if (typeof document !== 'undefined') {
    // 添加项目类名
    const body = document?.getElementsByTagName('body')[0];
    body?.classList.add(projectName);
  }
  app.provide('_styleModule', projectName === 'AOM' ? '' : projectName);
  // 合并css变量
  if (isObject(config.cssVariables)) {
    mergeCssVar(config.cssVariables);
  }
}

function mergeCssVar(cssVariables: Record<string, string>) {
  for (const cssName in cssVariables) {
    document.documentElement.style.setProperty(`--${cssName}`, cssVariables[cssName]);
  }
}
