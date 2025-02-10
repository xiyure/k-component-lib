import { defineComponent } from 'vue';
import { ElConfigProvider } from 'element-plus';
import { useLocale } from '../../hooks/use_locale';
import { GlobalProviderProps } from './type';

const GlobalProvider = defineComponent({
  name: 'KGlobalProvider',
  props: {
    locale: {
      type: String as () => GlobalProviderProps['locale'],
      default: 'zh'
    }
  },
  setup(props, { slots }) {
    const { elLocale } = useLocale(props);
    // 兼容element-plus的ConfigProvider
    const _slots = {
      default: () => slots.default?.()
    }
    return () => <ElConfigProvider locale={elLocale.value} v-slots={_slots}/>
  }
})
export type GlobalProviderInstance = InstanceType<typeof GlobalProvider>

export default GlobalProvider
