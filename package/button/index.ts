import KButton from './button.vue';

KButton.install = (Vue:any) => {
  Vue.compoent(KButton.name, KButton);
};

export default KButton;