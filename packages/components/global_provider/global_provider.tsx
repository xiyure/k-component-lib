import { computed, defineComponent, provide } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhLocal from 'element-plus/es/locale/lang/zh-cn';
import enLocal from 'element-plus/es/locale/lang/en';
import { localeContextKey } from '../../hooks/use_locale';
import { SIZE_KEY } from '../../hooks/use_size';
import { mergeCssVar, setStyleTheme} from '../../utils';
import { GlobalProviderProps } from './type';

const GlobalProvider = defineComponent({
  name: 'KGlobalProvider',
  props: {
    locale: {
      type: String as () => GlobalProviderProps['locale'],
      default: 'zh'
    },
    styleModule: {
      type: String as () => GlobalProviderProps['styleModule'],
      default: 'AOM'
    },
    size: {
      type: String as () => GlobalProviderProps['size'],
      default: 'base'
    },
    cssVariables: {
      type: Object as () => GlobalProviderProps['cssVariables'],
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    const elLocale = computed(() => {
      if (props.locale === 'en') {
        return enLocal;
      }
      return zhLocal;
    });
    // 兼容element-plus的ConfigProvider
    const _slots = {
      default: () => slots.default?.()
    };

    // set project theme
    setStyleTheme(props.styleModule);

    // merge css variables
    mergeCssVar(props.cssVariables)

    // provide config
    provide(SIZE_KEY, computed(() => props.size));
    provide(localeContextKey, computed(() => props.locale));

    return () => <ElConfigProvider locale={elLocale.value} v-slots={_slots} />;
  }
});
export type GlobalProviderInstance = InstanceType<typeof GlobalProvider>;

export default GlobalProvider;
