import type { App } from 'vue';
import DiffMatchPatch from 'diff-match-patch';
import { Emitter, ElementObserver } from '../utils';

// global provider
export function provide(app: App) {
  // 全局事件管理，用于多级组件之间的通信
  app.provide('__elementObserver', new ElementObserver());
  app.provide('_emitter', new Emitter());
  app.provide('__diffMatchPatch', new DiffMatchPatch());
}