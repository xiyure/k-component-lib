import Popconfirm from './popconfirm.vue';
import { withInstall } from '../../utils/install';
import { KPopconfirm as _KPopconfirm } from '../../../typings/all';

export const KPopconfirm = withInstall<typeof _KPopconfirm>(Popconfirm);
export default KPopconfirm;

export * from './type';