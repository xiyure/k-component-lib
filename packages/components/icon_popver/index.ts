import IconPopver from './icon_popver.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KIconPopver: SFCWithInstall<typeof IconPopver> = withInstall(IconPopver);
export default KIconPopver;

export * from './type';