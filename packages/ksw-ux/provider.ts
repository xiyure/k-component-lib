import type { App } from 'vue';
import DiffMatchPatch from 'diff-match-patch';
import globalProps from './global/props'
import { Emitter, ElementObserver } from '../utils';
import type { ContextConfig } from '@ksw-ux/utils/typescript';

// global provider
export function provide(app: App, config: ContextConfig | undefined) {
  // 全局事件管理，用于多级组件之间的通信
  app.provide('__elementObserver', new ElementObserver());
  app.provide('_emitter', new Emitter());
  app.provide('__diffMatchPatch', new DiffMatchPatch());
  app.provide('__globalProps', Object.assign(globalProps, config?.globalProperties ?? {}));
}