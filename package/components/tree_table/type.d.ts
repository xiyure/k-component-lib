import type { VxeTableProps } from 'vxe-table';

export interface columnConfigType {
  visible?: boolean
  key?: string | number
  field?: string
  title?: string
  fixed?: boolean
  width?: string | number
  filters?: any
  align?: boolean
  treeNode?: any
  cellRender?: any
  editRender?: any
  minWidth?: string | number
  sortable?: boolean
}

export interface PaginationConfigType {
  total?: number
  pagerCount?: number
  currentPage?: number
  pageSizes?: number[]
  pageSize?: number
  layout?: string
}

export interface TreeTableProps extends VxeTableProps {
  column: any[]
  exactMatch?: boolean
  showPage?: boolean
  useTree?: boolean
  isRemoteQuery?: boolean
  isServerPaging?: boolean
  paginationConfig?: PaginationConfigType
  showSearchInput?: boolean
  showFilter?: boolean
  showRefresh?: boolean
  showDescription?: boolean,
  showTransfer?: boolean
}