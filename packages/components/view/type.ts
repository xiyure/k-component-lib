import { Component } from 'vue'
import { TreeData, TreeNodeData } from 'element-plus/es/components/tree/src/tree.type'

export interface ViewProps {
  defaultActive?: string | number
  data?: ViewData[]
  draggable?: boolean
  collapse?: boolean
  showCustomControl?: boolean
  useTree?: boolean
  treeConfig?: TreeViewConfig
  showArrow?: boolean
}
export interface ViewData {
  value: any
  label?: string
  count?: number | string
  disabled?: boolean
  custom?: boolean
  showCustomControl?: boolean
  children?: ViewData[]
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
