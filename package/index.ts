import ElementPlus from 'element-plus';
import zhLocal from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';

const compoentList:Array<any> = [];
// 读取package文件夹下的所有组件数据
const files = import.meta.glob('./**/*.vue', { eager: true });
for (const file in files) {
  const module = files[file] as any;
  compoentList.push(module.default);
}

type OptionsType = {
  localeLang: string
};
const install = (Vue:any, options?:OptionsType) => {
  const { localeLang } = options || {};
  Vue.use(ElementPlus, {
    locale: localeLang === 'zh' ? zhLocal : ''
  });
  compoentList.forEach(component => {
    Vue.component(component.name, component);
  });
};

const compoents = {};
compoentList.forEach(comp => {
  compoents[comp.name] = comp;
});

export default {
  install,
  ...compoents,
};
