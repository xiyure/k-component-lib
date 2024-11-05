import TreeTable from './tree_table.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KTreeTable: SFCWithInstall<typeof TreeTable> = withInstall(TreeTable);
export default KTreeTable;

export * from './type';