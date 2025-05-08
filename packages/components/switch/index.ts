import Switch from './switch.vue';
import { withInstall } from '../../utils/install';
import { KSwitch as _KSwitch } from '../../../typings/all';

export const KSwitch = withInstall<typeof _KSwitch>(Switch);
export default KSwitch;

export * from './type';