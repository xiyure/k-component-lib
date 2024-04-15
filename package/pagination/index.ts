import KPagination from './pagination.vue';

KPagination.install = (Vue:any) => {
  Vue.compoent(KPagination.name, KPagination);
};

export default KPagination;