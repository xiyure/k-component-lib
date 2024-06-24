import { Component } from 'vue';

export interface TreeTransferProps {
  data: any[]
  defaultData?: any[]
  leftTitle?: string
  rightTitle?: string
  showFilter?: boolean
  useTree?: boolean
  expandIcon?: Component
  collapseIcon?: Component
  icon?: Component
  treeConfig?: any
  label?: string
  scrollY?: any
}