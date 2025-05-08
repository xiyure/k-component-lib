import Pagination from './pagination.vue';
import { withInstall } from '../../utils/install';
import { KPagination as _KPagination } from '../../../typings/all';

export const KPagination = withInstall<typeof _KPagination>(Pagination);
export default KPagination;

export * from './type';