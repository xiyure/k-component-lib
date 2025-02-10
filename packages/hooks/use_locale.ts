import { watch, inject, computed } from 'vue';
import { VxeUI } from 'vxe-table';
import zhLocal from 'element-plus/es/locale/lang/zh-cn';
import enLocal from 'element-plus/es/locale/lang/en';
import { I18n } from 'vue-i18n';
import { localeContextKey } from '../utils/key';
import { GlobalProviderProps} from '../components/global_provider';

export function useLocale(props: GlobalProviderProps) {
  const i18n = inject(localeContextKey) as I18n;
  const elLocale = computed(() => {
    if (props.locale === 'en') {
      return enLocal;
    }
    return zhLocal;
  });
  // 监听locale变化处理多语言切换场景
  watch(() => props.locale, (locale) => {
    changeLocale(locale, i18n);
  });
  return {
    elLocale
  }
}
function changeLocale(locale: 'zh' | 'en' | undefined, i18n: I18n) {
  const lang = locale === 'en' ? 'en' : 'zh';
  i18n.global.locale = lang;
  // 兼容vxe-table多语言切换参数格式
  const vxeLocaleKey = lang === 'en' ? 'en-US' : 'zh-CN';
  VxeUI.setLanguage(vxeLocaleKey);
}