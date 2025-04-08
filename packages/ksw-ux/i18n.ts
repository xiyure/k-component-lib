import { computed, type App } from 'vue';
import { createI18n } from 'vue-i18n';
import { localeContextKey } from '../hooks/use_locale';
import type { ContextConfig } from '@ksw-ux/utils/typescript';
import zh from '../locale/zh';
import en from '../locale/en';

// i18n
export function useI18n(app: App, config: ContextConfig = {}) {
  const messages = { zh, en };
  const i18n = createI18n({
    locale: config?.locale === 'en' ? 'en' : 'zh',
    messages
  });
  app.provide('$i18n', i18n);
  app.provide(localeContextKey, computed(() => config?.locale === 'en' ? 'en' : 'zh'));
}