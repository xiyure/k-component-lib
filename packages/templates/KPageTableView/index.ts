import PageTableView from './PageTableView.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KPageTableView: SFCWithInstall<typeof PageTableView> = withInstall(PageTableView);
export default KPageTableView;

export * from './type';
