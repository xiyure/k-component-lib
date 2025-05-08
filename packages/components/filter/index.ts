import Filter from './filter.vue';
import { withInstall } from '../../utils/install';
import { KFilter as _KFilter } from '../../../typings/all';

export const KFilter = withInstall<typeof _KFilter>(Filter);
export default KFilter;

export * from './type';