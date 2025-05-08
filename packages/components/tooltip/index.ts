import Tooltip from './tooltip.vue';
import { withInstall } from '../../utils/install';
import { KTooltip as _KTooltip } from '../../../typings/all';

export const KTooltip = withInstall<typeof _KTooltip>(Tooltip);
export default KTooltip;

export * from './type';