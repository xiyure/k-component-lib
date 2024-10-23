import { Component, VNode } from 'vue';
import { VxeColgroupProps, VxeColumnProps } from 'vxe-table';

export interface columnConfigType extends VxeColumnProps {
  visible?: boolean
  key?: string | number
  field?: string
  title?: string
  width?: string | number
  filters?: any[]
  treeNode?: boolean
  cellRender?: any
  editRender?: any
  minWidth?: string | number
  sortable?: boolean
  showIcon?: boolean
  showColumnMenu?: boolean
  group?: VxeColgroupProps[]
  dataType?: string
  render?: () => VNode
}

type widgetItemType = {
  id: string,
  widget: Component | (() => VNode | Component) 
}
type FilterColumnType = {
  title: string
  field: string
  dataType?: string
  options: {
    label: string
    value: any
  }[]
}
export interface PaginationConfigType {
  total?: number
  pagerCount?: number
  currentPage?: number
  pageSizes?: number[]
  pageSize?: number
  layout?: string
  isRemotePaging?: boolean
}

export interface seqConfigType {
  seqMethod?: (row: any) => string | number
  startIndex?: number
}

export interface TreeTableProps {
  data?: any[]
  size?: string
  sortConfig?: object
  seqConfig?: seqConfigType
  rowConfig?: any
  editConfig?: object
  scrollY?: object
  columnConfig?: object
  checkboxConfig?: any
  treeConfig?: object
  showOverflow?: string | boolean
  autoResize?: boolean
  height?: string
  fit?: boolean
  align?: string
  border?: boolean | string
  emptyText?: string
  rowStyle?: object | ((rowInfo: any) => object)
  column: columnConfigType[]
  showPage?: boolean
  useTree?: boolean
  isRemoteQuery?: boolean
  isServerPaging?: boolean
  paginationConfig?: PaginationConfigType
  showDescription?: boolean
  showHeaderTools?: boolean
  batchOperations?: any[]
  showBatchOperation?: boolean
  showColumnMenu?: boolean
  showDragColumn?: boolean
  cellClickToggleHighlight?: boolean
  widgets?: (string | widgetItemType)[]
  showSearchInput?: boolean
  showFilter?: boolean
  showRefresh?: boolean
  showTransfer?: boolean
  advancedFilterConfig?: {
    filterColumns?: FilterColumnType[]
    filterAll?: boolean
    exclude?: string[],
    remote?: boolean | string[]
    dateFormat?: string
    defaultCondition?: {
      conditionList?: any[]
      filterRule?: number
    }
  }
  searchConfig?: {
    strict?: boolean
    searchMethod?: (key: string | number, data: any[]) => any[]
    isRemoteQuery?: boolean
  }
  style?: object
  class?: string
  simple?: boolean
}

export interface Store {
  data: any[]
  sortData: any[]
  filterData: any[]
}

export interface TableHeaderControl {
  label: string
  key: string
  visible?: boolean
  disabled?: boolean
}