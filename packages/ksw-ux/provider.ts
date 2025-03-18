import { computed, type App } from 'vue';
import { Emitter, ElementObserver, ContextConfig } from '../utils';
import { SIZE_KEY } from '../hooks';

// global provider
export function provide(app: App, config: ContextConfig | undefined) {
  // 全局事件管理，用于多级组件之间的通信
  app.provide('__elementObserver', new ElementObserver());
  app.provide('_emitter', new Emitter());
  app.provide(SIZE_KEY, computed(() => config?.size));
}