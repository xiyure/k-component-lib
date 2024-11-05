import MenuView from './KMenuView.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KMenuView: SFCWithInstall<typeof MenuView> = withInstall(MenuView);
export default KMenuView;

export * from './type';
