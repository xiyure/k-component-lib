import Cascader from './cascader.vue';
import { withInstall } from '../../utils/install';
import { KCascader as _KCascader } from '../../../typings/all';

export const KCascader = withInstall<typeof _KCascader>(Cascader);
export default KCascader;

export * from './type';