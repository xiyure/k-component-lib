import Operate from './operate.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KOperate: SFCWithInstall<typeof Operate> = withInstall(Operate);
export default KOperate;

export * from './type';