import Table from './table.vue';
import TableColumn from './table_column.vue';
import ColumnGroup from './column_group.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall, withNoopInstall } from '../../utils/install';

export const KTable: SFCWithInstall<typeof Table> &
{
  KTableColumn: typeof KTableColumn,
  KColumnGroup: typeof KColumnGroup
} = withInstall(Table, { TableColumn, ColumnGroup });
export default KTable;

export const KTableColumn: SFCWithInstall<typeof TableColumn> = withNoopInstall(TableColumn);

export const KColumnGroup: SFCWithInstall<typeof ColumnGroup> = withNoopInstall(ColumnGroup);

export * from './type';