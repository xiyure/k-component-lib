import IconPopover from './icon_popover.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KIconPopover: SFCWithInstall<typeof IconPopover> = withInstall(IconPopover);
export default KIconPopover;

export * from './type';