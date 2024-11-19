import type { App } from 'vue';
import {
  makeRegister,
  registerThirdLib,
  useI18n,
  useTheme,
  useDirectives,
  provide
} from './ksw-ux';
import type { ContextConfig } from '@ksw-ux/utils/typescript';

const install = (app: App, options?: ContextConfig) => {
  makeRegister(app);
  useTheme(app, options);
  registerThirdLib(app, options);
  useI18n(app, options);
  useDirectives(app);
  provide(app);
};

export * from './components';
export * from './templates';
export * from './native';
export default install;
