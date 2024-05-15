import ElementPlus from 'element-plus';
import VXETable from 'vxe-table';
import zhLocal from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import 'vxe-table/lib/style.css';
import 'ksw-vue-icon/styles/icon.css';
import './style/font.css';
import './style/variable.less';
import * as components from './components';
import { Emitter } from './utils';

const install = (Vue:any) => {
  Vue.use(ElementPlus, {
    locale: zhLocal
  });
  Vue.use(VXETable);
  for (const name in components) {
    Vue.component(name, components[name]);
  }
  // 全局事件管理器，用于多级组件之间的通信
  Vue.config.globalProperties.__emitter__ = new Emitter();
};

export * from './components';
export default install;
