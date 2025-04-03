import { Component } from 'vue';
import { TreeData, TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';

export interface ViewProps {
  defaultActive?: string | number
  data?: ViewData[]
  draggable?: boolean
  collapse?: boolean
  showCustomControl?: boolean
  useTree?: boolean
  treeConfig?: TreeViewConfig
  showArrow?: boolean
  showCount?: boolean
  props?: ViewAttributes
  simple?: boolean
  height?: string | number
}
export interface ViewAttributes {
  label?: string
  value?: string
  count?: string
  custom?: string
  disabled?: string
  children?: string
}
export interface ViewData {
  showCustomControl?: boolean
  [key: string]: any
}
export interface ViewItemProps {
  label: string
  value: string
  count: number | string
  custom: boolean
  disabled: boolean
  showCustomControl?: boolean
  originData?: any
}

export interface TreeViewProps {
  data: ViewData[]
  treeConfig: TreeViewConfig
}

export interface TreeViewConfig {
  nodeKey?: string | number
  emptyText?: string
  expandOnClickNode?: boolean
  checkOnClickNode?: boolean
  defaultExpandedKeys?: (string | number)[]
  currentNodeKey?: string | number
  accordion?: boolean
  indent?: number
  lazy?: boolean
  load?: (
    node: TreeNodeData,
    loadedCallback: (data: TreeData) => void,
    stopLoading: () => void,
  ) => void
  icon?: string | Component | (() => string | Component)
  expandIcon?: string | Component | (() => string | Component)
  collapseIcon?: string | Component | (() => string | Component)
  showArrow?: boolean
}
