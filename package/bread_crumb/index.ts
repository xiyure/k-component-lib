import KBreadCrumb from './index.vue';

KBreadCrumb.install = (Vue:any) => {
  Vue.compoent(KBreadCrumb.name, KBreadCrumb);
};

export default KBreadCrumb;