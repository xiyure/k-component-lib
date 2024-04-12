const compoentList:Array<any> = [];
// 读取package文件夹下的所有组件数据
const files = import.meta.glob('./**/*.vue', { eager: true });
for (const file in files) {
  const module = files[file] as any;
  compoentList.push(module.default);
}

const install = (Vue:any) => {
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
