import { Component } from 'vue';

export interface TreeTransferProps {
  modelValue: any[]
  data: any[]
  defaultData?: any[]
  nodeKey: string
  leftTitle?: string
  rightTitle?: string
  usetree?: boolean
  showFilter?: boolean
  useTree?: boolean
  expandIcon?: Component
  collapseIcon?: Component
  icon?: Component
  treeConfig?: any
}