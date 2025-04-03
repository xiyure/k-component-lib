import { Component, VNode, CSSProperties } from 'vue';
import { VxeTablePropTypes, VxeColgroupProps, VxeColumnPropTypes } from 'vxe-table';
import { PaginationProps as ElPaginationProps } from 'element-plus';
import { OperateData } from '../operate/type';
import { Condition, FilterValue, ConditionInfo } from '../filter/type';
import { Merge, CompSize } from '../../utils/typescript';

export type Row = VxeTablePropTypes.Row;
export type TreeConfig = VxeTablePropTypes.TreeConfig;
export type RowConfig = VxeTablePropTypes.RowConfig;
export type SortConfig = VxeTablePropTypes.SortConfig;
export type EditConfig = VxeTablePropTypes.EditConfig;
export type ScrollY = VxeTablePropTypes.ScrollY;
export type CheckboxConfig = VxeTablePropTypes.CheckboxConfig;
export type ColumnConfig = VxeTablePropTypes.ColumnConfig;

export interface TreeTableProps {
  data?: RowData[];
  size?: string;
  sortConfig?: SortConfig;
  seqConfig?: SeqConfig;
  rowConfig?: RowConfig;
  editConfig?: EditConfig;
  scrollY?: ScrollY;
  columnConfig?: ColumnConfig;
  checkboxConfig?: CheckboxConfig;
  treeConfig?: TreeConfig;
  showOverflow?: string | boolean;
  autoResize?: boolean;
  height?: string | number;
  align?: string;
  border?: boolean | string;
  emptyText?: string;
  rowStyle?: CSSProperties | ((rowInfo: Row) => CSSProperties);
  column: Column[];
  showPage?: boolean;
  useTree?: boolean;
  isRemoteQuery?: boolean;
  isServerPaging?: boolean;
  paginationConfig?: TablePaginationConfig;
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
  class?:
    | string
    | { [className: string]: boolean }
    | Array<string | { [className: string]: boolean }>;
  simple?: boolean;
  defaultTransferData?:
    | (() => TableHeaderControl[] | Promise<TableHeaderControl[]>)
    | TableHeaderControl[];
  onTransferShow?: () => void;
  onTransferHide?: (transferData: TableHeaderControl[]) => void;
  onTransferChange?: (transferData: TableHeaderControl[]) => void;
  onAdvancedFilterShow?: () => void;
  onAdvancedFilterHide?: (filterInfo: { conditionInfo: ConditionInfo; filterData: any[] }) => void;
  useAntStyle?: boolean;
  round?: boolean;
  adaptive?: boolean;
  hasSpace?: boolean;
}

export interface Column {
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
  group?: (Column & VxeColgroupProps)[];
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
export type TablePaginationConfig = Merge<
  {
    size?: CompSize;
    isRemotePaging?: boolean;
    pagingMethod?: (params: TableRemoteMethod) => Promise<{ data: RowData[]; total: number }>;
  },
  {
    -readonly [K in keyof ElPaginationProps]: ElPaginationProps[K];
  }
>;

export interface SeqConfig {
  seqMethod?: (rowConfig: RowConfig) => string | number;
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
  filterMethod?: (params: TableRemoteMethod) => RowData[] | Promise<RowData[]>;
}

export interface SearchConfig {
  strict?: boolean;
  searchMethod?: (params: TableRemoteMethod) => RowData[] | Promise<RowData[]>;
  isRemoteQuery?: boolean;
  ignoreCase?: boolean;
  searchColumns?: string[];
  supportPinYin?: string[] | boolean;
}

export interface RowData {
  icon?: string;
  __folder__?: boolean;
  iconStyle?: CSSProperties & { empty?: boolean; size?: number };
  [key: string]: any;
}

export type TableCacheData = {
  treeDataMap: Map<string | number, RowData>;
  tableDataMap: Map<string | number, { node: RowData; children: RowData[] }>;
};

export type TableRemoteMethod = {
  searchKeyWord: string
  currentPage: number | undefined
  pageSize: number | undefined
  pageSizes: number[] | undefined
  conditionInfo: ConditionInfo,
  currentData?: RowData[]
}
