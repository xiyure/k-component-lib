import IconPopover from './icon_popover.vue';
import { withInstall } from '../../utils/install';
import { KIconPopover as _KIconPopover } from '../../../typings/all';

export const KIconPopover = withInstall<typeof _KIconPopover>(IconPopover);
export default KIconPopover;

export * from './type';