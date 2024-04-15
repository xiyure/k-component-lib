import KSwitch from './switch.vue';

KSwitch.install = (Vue:any) => {
  Vue.compoent(KSwitch.name, KSwitch);
};

export default KSwitch;