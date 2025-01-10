import { Component, VNode, CSSProperties } from 'vue';
import { VxeTablePropTypes, VxeColgroupProps, VxeColumnPropTypes } from 'vxe-table';
import { PaginationProps as ElPaginationProps } from 'element-plus';
import { OperateData } from '../operate/type';
import { Condition, FilterValue, ConditionInfo } from '../filter/type';
import { RequireToOptional } from '../../utils/typescript';

export type Row = VxeTablePropTypes.Row;
export interface TreeTableProps {
  data?: RowData[];
  size?: string;
  sortConfig?: VxeTablePropTypes.SortConfig;
  seqConfig?: SeqConfig;
  rowConfig?: VxeTablePropTypes.RowConfig;
  editConfig?: VxeTablePropTypes.EditConfig;
  scrollY?: VxeTablePropTypes.ScrollY;
  columnConfig?: VxeTablePropTypes.ColumnConfig;
  checkboxConfig?: VxeTablePropTypes.CheckboxConfig;
  treeConfig?: VxeTablePropTypes.TreeConfig;
  showOverflow?: string | boolean;
  autoResize?: boolean;
  height?: string | number;
  align?: string;
  border?: boolean | string;
  emptyText?: string;
  rowStyle?: CSSProperties | ((rowInfo: Row) => CSSProperties);
  column: ColumnConfig[];
  showPage?: boolean;
  useTree?: boolean;
  isRemoteQuery?: boolean;
  isServerPaging?: boolean;
  paginationConfig?: PaginationConfig;
  showDescription?: boolean;
  showHeaderTools?: boolean;
  batchOperations?: OperateData[];
  showBatchOperation?: boolean;
  showColumnMenu?: boolean;
  showDragColumn?: boolean;
  cellClickToggleHighlight?: boolean;
  widgets?: (string | WidgetItem)[];
  showSearchInput?: boolean;
  showFilter?: boolean;
  showRefresh?: boolean;
  showTransfer?: boolean;
  showSizeControl?: boolean;
  advancedFilterConfig?: AdvancedFilterConfig;
  searchConfig?: SearchConfig;
  style?: CSSProperties;
  class?: string;
  simple?: boolean;
  defaultTransferData?:
    | (() => TableHeaderControl[] | Promise<TableHeaderControl[]>)
    | TableHeaderControl[];
  onTransferShow?: () => void;
  onTransferHide?: (transferData: TableHeaderControl[]) => void;
  onTransferChange?: (transferData: TableHeaderControl[]) => void;
  onAdvancedFilterShow?: () => void;
  onAdvancedFilterHide?: (filterInfo: { conditionInfo: ConditionInfo; filterData: any[] }) => void;
  searchFunction?: (searchData: FilterValue) => void;
  useAntStyle?: boolean;
  round?: boolean;
  adaptive?: boolean;
  hasSpace?: boolean;
}

export interface ColumnConfig {
  visible?: boolean;
  key?: string | number;
  field?: string;
  title?: string;
  width?: string | number;
  filters?: VxeColumnPropTypes.Filters;
  treeNode?: boolean;
  cellRender?: VxeColumnPropTypes.CellRender;
  editRender?: VxeColumnPropTypes.EditRender;
  minWidth?: string | number;
  sortable?: boolean;
  showIcon?: boolean;
  showColumnMenu?: boolean;
  group?: (ColumnConfig & VxeColgroupProps)[];
  dataType?: string;
  render?: (...arg: any) => VNode;
  renderEdit?: (data: any) => VNode;
  [key: string]: any;
}

export type WidgetItem = {
  id: string;
  widget?: Component | (() => VNode | Component);
};
type FilterColumn = {
  title: string;
  field: string;
  dataType?: string;
  options: {
    label: string;
    value: FilterValue;
  }[];
};
export interface PaginationConfig extends RequireToOptional<Omit<ElPaginationProps, 'size'>> {
  size?: 'base' | 'sm';
  isRemotePaging?: boolean;
}

export interface SeqConfig {
  seqMethod?: (rowConfig: VxeTablePropTypes.RowConfig) => string | number;
  startIndex?: number;
}

export interface Store {
  data: any[];
  sortData: any[];
  filterData: any[];
}

export interface TableHeaderControl {
  label: string;
  key: string;
  visible?: boolean;
  disabled?: boolean;
  width?: string;
}

export interface AdvancedFilterConfig {
  filterColumns?: FilterColumn[];
  filterAll?: boolean;
  exclude?: string[];
  ignoreCase?: boolean;
  remote?: boolean | string[];
  dateFormat?: string;
  defaultCondition?: {
    conditionList?: Condition[];
    filterRule?: number;
  };
}

export interface SearchConfig {
  strict?: boolean;
  searchMethod?: (key: string | number, data: any[]) => any[];
  isRemoteQuery?: boolean;
  ignoreCase?: boolean;
}

export interface RowData {
  icon?: string;
  __folder__?: boolean;
  iconStyle?: CSSProperties & { empty: boolean; size: number };
  [key: string]: any;
}
