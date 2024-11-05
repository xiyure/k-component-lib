import Pagination from './pagination.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KPagination: SFCWithInstall<typeof Pagination> = withInstall(Pagination);
export default KPagination;

export * from './type';