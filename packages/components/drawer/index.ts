import Drawer from './drawer.vue';
import { withInstall } from '../../utils/install';
import { KDrawer as _KDrawer } from '../../../typings/all';

export const KDrawer = withInstall<typeof _KDrawer>(Drawer);
export * from './type';
export default KDrawer;