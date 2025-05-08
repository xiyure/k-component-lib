import Popover from './popover.vue';
import { withInstall } from '../../utils/install';
import { KPopover as _KPopover } from '../../../typings/all';

export const KPopover = withInstall<typeof _KPopover>(Popover);
export default KPopover;

export * from './type';