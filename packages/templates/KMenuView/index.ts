import MenuView from './MenuView.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KMenuView: SFCWithInstall<typeof MenuView> = withInstall(MenuView);
export default KMenuView;

export * from './type';
