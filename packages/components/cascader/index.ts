import Cascader from './cascader.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KCascader: SFCWithInstall<typeof Cascader> = withInstall(Cascader);
export default KCascader;

export * from './type';