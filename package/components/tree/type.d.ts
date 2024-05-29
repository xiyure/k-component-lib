import type { TreeNode, TreeKey, TreeData } from 'element-plus/es/components/tree-v2/src/types';
import { Component } from 'vue';

interface PropsType {
  label?: string
  value?: string | number
  children?: string
  disabled?: string
}
export interface TreeProps {
  data: TreeData[]
  emptyText?: string
  props?: PropsType
  highlightCurrent?: boolean
  expandOnClickNode?: boolean
  checkOnClickNode?: boolean
  defaultExpandedKeys?: TreeKey[]
  showCheckbox?: boolean
  checkStrictly?: boolean
  defaultCheckedKeys?: TreeKey[]
  currentNodeKey?: string | number
  filterMethod?: (value:string, data:TreeNode) => void
  indent?: number
  icon?: Component
  itemSize?: number
  showFilter?: boolean
  lazy?: boolean
}