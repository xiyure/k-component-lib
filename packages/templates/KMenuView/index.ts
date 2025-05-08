import MenuView from './MenuView.vue';
import { withInstall } from '../../utils/install';
import { KMenuView as _KMenuView } from '../../../typings/all';

export const KMenuView = withInstall<typeof _KMenuView>(MenuView);
export default KMenuView;

export * from './type';
