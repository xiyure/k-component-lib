import { Component, VNode } from 'vue';
import { VxeTablePropTypes, VxeColgroupProps, VxeColumnPropTypes } from 'vxe-table';
import { PaginationProps as ElPaginationProps } from 'element-plus';
import { RequireToOptional } from '../../utils/typescript';

export interface TreeTransferProps {
  data: TreeTransferData[]
  defaultData?: string[]
  titles?: [string, string]
  showSearchInput?: boolean
  useTree?: boolean
  expandIcon?: Component | string
  expandIconColor?: string
  collapseIcon?: Component | string
  collapseIconColor?: string
  icon?: Component | string
  iconColor?: string
  treeConfig?: VxeTablePropTypes.TreeConfig
  label?: string
  scrollY?: VxeTablePropTypes.ScrollY
  drag?: boolean
  showDrag?: boolean
  showPage?: boolean
  searchStrictly?: boolean
  paginationLeftConfig?: PaginationConfig
  paginationRightConfig?: PaginationConfig
  columns?: Column[]
  tableHeight?: number
  modelValue?: TreeTransferData[]
  checkMethod?: (data: any) => boolean
  searchMethod?: (keyword: string, data: any[]) => Promise<any[]>
  searchRightMethod?: (keyword: string, data: any[]) => Promise<any[]>
}

export interface TreeTransferData {
  [key: string]: any
}

export interface PaginationConfig extends RequireToOptional<Omit<ElPaginationProps, 'size'>> {
  size?: 'base' | 'sm';
  isRemotePaging?: boolean;
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