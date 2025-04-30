import { VxeColumnProps, VxeColumnPropTypes, VxeTableDefines } from 'vxe-table';
import { ExpandTrigger } from 'element-plus';

export interface KTableProps {
  showColumnMenu?: boolean
}
export interface TableColumnProps {
  sortable?: boolean
  filters?: VxeColumnPropTypes.FilterItem[]
  desc?: string
  showColumnMenu?: boolean
  editRender?: VxeColumnPropTypes.EditRender
  type?: 'seq' | 'checkbox' | 'radio' | 'html' | 'expand' | null
  field?: string
}

export interface FilterPopperProps {
  filters?: VxeColumnPropTypes.FilterItem[]
  column?: VxeColumnProps
  trigger?: ExpandTrigger
  visible?: boolean
  text?: {
    resetButtonText?: string
    confirmButtonText?: string
  }
}

export type Column = VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo;