import TreeTable from './tree_table.vue';
import { withInstall } from '../../utils/install';
import { KTreeTable as _KTreeTable } from '../../../typings/all';

export const KTreeTable = withInstall<typeof _KTreeTable>(TreeTable);
export default KTreeTable;

export * from './type';