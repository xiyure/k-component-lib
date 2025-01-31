import Filter from './filter.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KFilter: SFCWithInstall<typeof Filter> = withInstall(Filter);
export default KFilter;

export * from './type';