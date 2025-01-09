import Drawer from './drawer.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KDrawer: SFCWithInstall<typeof Drawer> = withInstall(Drawer);
export * from './type';
export default KDrawer;