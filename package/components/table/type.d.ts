export interface KTableProps {
  showOverflow?: any
  data?: any[]
  showDragColumn?: false
  fullData?: any[]
}
export interface TableColumnProps {
  sortable?: boolean
  width?: number | string
  filters?: any[]
  desc?: string
  showColumnMenu?: boolean
  editRender?: any
  type?: 'seq' | 'checkbox' | 'radio' | 'html' | 'expand'
}