import ElementPlus from 'element-plus';
import zhLocal from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import 'ksw-vue-icon/styles/icon.css';
import './style/font.css';
import './style/variable.less';
import * as components from './components';

const install = (Vue:any) => {
  Vue.use(ElementPlus, {
    locale: zhLocal
  });
  for (const name in components) {
    Vue.component(name, components[name]);
  }
};

export * from './components';
export default install;
