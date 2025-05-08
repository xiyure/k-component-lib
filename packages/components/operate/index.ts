import Operate from './operate.vue';
import { withInstall } from '../../utils/install';
import { KOperate as _KOperate } from '../../../typings/all';

export const KOperate = withInstall<typeof _KOperate>(Operate);
export default KOperate;

export * from './type';