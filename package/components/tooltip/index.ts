import Tooltip from './tooltip.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KTooltip: SFCWithInstall<typeof Tooltip> = withInstall(Tooltip);
export default KTooltip;

export * from './type';