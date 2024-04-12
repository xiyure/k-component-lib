import KInputNumber from './input_number.vue';

KInputNumber.install = (Vue:any) => {
  Vue.compoent(KInputNumber.name, KInputNumber);
};

export default KInputNumber;