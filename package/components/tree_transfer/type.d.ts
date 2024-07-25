import { Component } from 'vue';

export interface TreeTransferProps {
  data: any[]
  defaultData?: any[]
  titles?: [string, string]
  showFilter?: boolean
  useTree?: boolean
  expandIcon?: Component | string
  expandIconColor?: string
  collapseIcon?: Component | string
  collapseIconColor?: string
  icon?: Component | string
  iconColor?: string
  treeConfig?: any
  label?: string
  scrollY?: any
  drag?: boolean
  checkMethod?: (data: any) => boolean
}