import Switch from './switch.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KSwitch: SFCWithInstall<typeof Switch> = withInstall(Switch);
export default KSwitch;

export * from './type';