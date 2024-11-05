import Cascader from './cascader.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KCascader: SFCWithInstall<typeof Cascader> = withInstall(Cascader);
export default KCascader;

export * from './type';