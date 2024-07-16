import { VxeColgroupProps, VxeColumnProps } from 'vxe-table';

export interface columnConfigType extends VxeColumnProps {
  visible?: boolean
  key?: string | number
  field?: string
  title?: string
  width?: string | number
  filters?: any
  treeNode?: any
  cellRender?: any
  editRender?: any
  minWidth?: string | number
  sortable?: boolean
  showIcon?: boolean
  showColumnMenu?: boolean
  group?: VxeColgroupProps[]
  dataType?: string
  render?: () => any
}

export interface PaginationConfigType {
  total?: number
  pagerCount?: number
  currentPage?: number
  pageSizes?: number[]
  pageSize?: number
  layout?: string
}

export interface TreeTableProps {
  data: any[]
  size?: string
  sortConfig?: object
  rowConfig?: object
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
  exactMatch?: boolean
  showPage?: boolean
  useTree?: boolean
  isRemoteQuery?: boolean
  isServerPaging?: boolean
  paginationConfig?: PaginationConfigType
  showSearchInput?: boolean
  showFilter?: boolean
  showRefresh?: boolean
  showDescription?: boolean
  showTransfer?: boolean
  showHeaderTools?: boolean
  batchOperations?: any[]
  showBatchOperation?: boolean
  showColumnMenu?: boolean
  cellClickToggleHighlight?: boolean
}