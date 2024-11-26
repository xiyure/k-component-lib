import { Component } from 'vue';
import { VxeTablePropTypes } from 'vxe-table';

export interface TreeTransferProps {
  data: TreeTransferData[]
  defaultData?: string[]
  titles?: [string, string]
  showFilter?: boolean
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
  checkMethod?: (data: any) => boolean
}

export interface TreeTransferData {
  [key: string]: any
}