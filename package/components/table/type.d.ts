export interface KTableProps {
  data?: any[]
  showDragColumn?: boolean
  showColumnMenu?: boolean
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