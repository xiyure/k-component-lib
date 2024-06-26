import { Component } from 'vue';

export interface TreeTransferProps {
  data: any[]
  defaultData?: any[]
  leftTitle?: string
  rightTitle?: string
  showFilter?: boolean
  useTree?: boolean
  expandIcon?: Component
  expandIconColor?: string
  collapseIcon?: Component
  collapseIconColor?: string
  icon?: Component
  iconColor?: string
  treeConfig?: any
  label?: string
  scrollY?: any
}