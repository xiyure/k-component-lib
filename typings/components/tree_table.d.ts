import { Ref, SetupContext, RenderFunction } from 'vue';
import { VxeTableProps, VxeTableEventProps, VxeTableSlots, VxeTableMethods, VxeTableInstance } from 'vxe-table/types';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import { TablePaginationConfig, TreeTableProps, Row, RowData, Column, ConditionInfo, TableHeaderControl } from '../base';

export declare const KTreeTable: DefineComponentApp<KTreeTableProps, KTreeTableEmits, KTreeTableSlots>

export type KTreeTableInstance = DefineComponentInstance<KTreeTableProps, KTreeTableConstructor>

export interface KTreeTableConstructor extends ComponentBaseOptions, KTreeTableMethods {
  props: KTreeTableProps
  context: SetupContext<KTreeTableEmits>
  getRefMaps(): KTreeTablePrivateRef
  getComputeMaps(): KTreeTablePrivateComputed
  renderVN: RenderFunction
}

export interface KTreeTablePrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KTreeTablePrivateComputed {}

export type KTreeTableProps = Merge<TreeTableProps, VxeTableProps>;

export type KTreeTableEmits = Merge<{
  removeQuery: (query: string) => void
  serverPaging: (config: TablePaginationConfig) => void
  refresh: () => void
  highlightClear: (row: Row) => void
  highlightChange: (row: Row, isHighlight: boolean) => void
  hideColumn: (column: Column) => void
  advancedFilterConfirm: (data: { conditionInfo: ConditionInfo; filterData: any[] }) => void
  advancedFilterClear: () => void
  pageCurrentChange: (pageNum: number) => void
  pageSizeChange: (pageSize: number) => void
  pageChange: (pageNum: number, pageSize: number) => void
  prevClick: (value: number) => void
  nextClick: (value: number) => void
}, VxeTableEventProps>;

export interface KTreeTableSlots extends VxeTableSlots {
  description: (_: { total: number, conditionInfo: ConditionInfo }) => ComponentSlotType
  'filter-trigger': (_: { isFilter: boolean }) => ComponentSlotType
  'size-control-trigger': () => ComponentSlotType
  'transfer-trigger': () => ComponentSlotType
  'header-extra': () => ComponentSlotType
  [key: string]: (...args: any) => ComponentSlotType

  /**
 * 已废弃，请使用 filter-trigger
 * @deprecated
 */
  filterTrigger: (_: { isFilter: boolean }) => ComponentSlotType
  /**
  * 已废弃，请使用 size-control-trigger
  * @deprecated
  */
  sizeControlTrigger: () => ComponentSlotType
  /**
* 已废弃，请使用 transfer-trigger
* @deprecated
*/
  transferTrigger: () => ComponentSlotType
}

export interface KTreeTableMethods extends VxeTableMethods {
  tableInstance: Ref<VxeTableInstance | undefined>
  filter: (searchKey?: string) => void
  advancedFilter: (data?: RowData[]) => Promise<{ conditionInfo: ConditionInfo; data: any[] }>
  clearAdvancedFilter: () => Promise<{ conditionInfo: ConditionInfo; data: any[] }>
  getAdvancedCondition: () => ConditionInfo
  getVisibleData: () => RowData[]
  loadData: (data?: RowData[]) => Promise<void>
  clearSearch: () => void
  refreshTableData: () => Promise<void>
  disposeRowTooltip: () => void
  getCheckboxRecords: (isFull?: boolean, onlyVisible?: boolean) => RowData[]
  getHeaderControllerData: () => TableHeaderControl[]
  setHeaderControllerData: (data: TableHeaderControl[]) => void
}