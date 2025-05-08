import TreeSelect from './tree_select.vue';
import { withInstall } from '../../utils/install';
import { KTreeSelect as _KTreeSelect } from '../../../typings/all';

export const KTreeSelect = withInstall<typeof _KTreeSelect>(TreeSelect);
export default KTreeSelect;

export * from './type';