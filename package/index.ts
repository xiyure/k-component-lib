import ElementPlus from 'element-plus';
import zhLocal from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import 'ksw-vue-icon/styles/icon.css';
import './style/font.css';
import './style/variable.less';
import * as components from './components';

type OptionsType = {
  localeLang: string
};
const install = (Vue:any, options?:OptionsType) => {
  const { localeLang } = options || {};
  Vue.use(ElementPlus, {
    locale: localeLang === 'zh' ? zhLocal : ''
  });
  for (const name in components) {
    Vue.component(name, components[name]);
  }
};

export * from './components';
export default install;
