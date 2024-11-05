import Popconfirm from './popconfirm.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KPopconfirm: SFCWithInstall<typeof Popconfirm> = withInstall(Popconfirm);
export default KPopconfirm;

export * from './type';