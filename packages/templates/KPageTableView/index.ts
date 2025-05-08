import PageTableView from './PageTableView.vue';
import { withInstall } from '../../utils/install';
import { KPageTableView as _KPageTableView } from '../../../typings/all';

export const KPageTableView = withInstall<typeof _KPageTableView>(PageTableView);
export default KPageTableView;

export * from './type';
