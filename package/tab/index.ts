import KTab from './tabs.vue';

KTab.install = (Vue:any) => {
  Vue.compoent(KTab.name, KTab);
};

export default KTab;