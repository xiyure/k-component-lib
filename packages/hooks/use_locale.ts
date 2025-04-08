import { inject, computed, ComputedRef } from 'vue';
import { I18n, VueI18nTranslation } from 'vue-i18n';
import { Lang } from '../utils/typescript/util_types';

export const localeContextKey = Symbol('localeContextKey');

export function useLocale(): {
  locale: ComputedRef<Lang>,
  t: VueI18nTranslation
} {
  const locale = inject<ComputedRef>(localeContextKey, computed(() => 'zh'));
  const i18n = inject<I18n>('$i18n');
  const $t = i18n?.global?.t as VueI18nTranslation
  const t = (text: string) => $t?.(text, locale.value)

  return {
    locale,
    t
  }
}