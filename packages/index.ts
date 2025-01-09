import type { App } from 'vue';
import type { ContextConfig } from '@ksw-ux/utils/typescript';
import {
  makeRegister,
  registerThirdLib,
  useI18n,
  useTheme,
  useDirectives,
  provide
} from './ksw-ux';

const install = (app: App, config?: ContextConfig) => {
  makeRegister(app);
  useTheme(app, config);
  registerThirdLib(app, config);
  useI18n(app, config);
  useDirectives(app);
  provide(app);
};

export * from './components';
export * from './templates';
export * from './native';
export default install;
