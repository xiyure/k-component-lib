import Popover from './popover.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KPopover: SFCWithInstall<typeof Popover> = withInstall(Popover);
export default KPopover;

export * from './type';