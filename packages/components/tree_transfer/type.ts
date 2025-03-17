import { Component } from 'vue';
import { VxeTablePropTypes } from 'vxe-table';
import { Column, SearchConfig, TablePaginationConfig } from '../tree_table';

export interface TreeTransferProps {
  modelValue?: TreeTransferData[]
  rowKey?: string
  data: TreeTransferData[]
  defaultData?: string[]
  titles?: [string, string]
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
  showDrag?: boolean
  showSearchInput?: boolean | 'left'
  searchConfig?: SearchConfig
  rightSearchConfig?: SearchConfig
  showPage?: boolean | 'left' | 'right'
  leftPaginationConfig?: TablePaginationConfig
  rightPaginationConfig?: TablePaginationConfig
  columns?: Column[]
  tableHeight?: number
  checkMethod?: (data: any) => boolean
  checkboxAll?: boolean
}

export interface TreeTransferData {
  [key: string]: any
}