import { Ref, SetupContext, RenderFunction } from 'vue';
import { Component, ComponentInternalInstance } from 'vue';
import {
  TreeData,
  TreeOptionProps,
  LoadFunction,
  RenderContentFunction,
  AllowDragFunction,
  FilterNodeMethodFunction,
  TreeNodeData,
  TreeKey,
  NodeDropType } from 'element-plus/es/components/tree/src/tree.type';
  import type Node from 'element-plus/es/components/tree/src/model/node'
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { TreeProps } from '../base';

export declare const KTree: DefineComponentApp<KTreeProps, KTreeEmits, KTreeSlots>

export type KTreeInstance = DefineComponentInstance<KTreeProps, KTreeConstructor>

export interface KTreeConstructor extends ComponentBaseOptions, KTreeMethods {
  props: KTreeProps
  context: SetupContext<KTreeEmits>
  getRefMaps(): KTreePrivateRef
  getComputeMaps(): KTreePrivateComputed
  renderVN: RenderFunction
}

export interface KTreePrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KTreePrivateComputed {}


export type KTreeProps = Merge<TreeProps, ElTreeProps>;

interface ElTreeProps {
  data?: TreeData
  emptyText?: string
  nodeKey?: string
  props?: TreeOptionProps
  renderAfterExpand?: boolean
  load?: LoadFunction
  renderContent?: RenderContentFunction
  highlightCurrent?: boolean
  defaultExpandAll?: boolean
  expandOnClickNode?: boolean
  checkOnClickNode?: boolean
  autoExpandParent?: boolean
  defaultExpandedKeys?: Array<string | number>
  showCheckbox?: boolean
  checkStrictly?: boolean
  defaultCheckedKeys?: Array<string | number>
  currentNodeKey?: string | number
  filterNodeMethod?: FilterNodeMethodFunction
  accordion?: boolean
  indent?: number
  icon?: string | Component
  lazy?: boolean
  draggable?: boolean
  allowDrag?: AllowDragFunction
  allowDrop?: AllowDragFunction

}

export interface KTreeEmits {
  nodeClick: (data: any, node: TreeNodeData, instance: ComponentInternalInstance | null,  event: MouseEvent) => void
  nodeContextmenu: (event: Event, data: any, node: TreeNodeData, instance: ComponentInternalInstance | null) => void
  checkChange: (data: any, checked: boolean, indeterminate: boolean) => void
  check: (data: any,  checkedData: { checkedNodes: TreeNodeData[], checkedKeys: TreeKey[], halfCheckedNodes: TreeNodeData[], halfCheckedKeys: TreeKey[] }) => void
  currentChange: (data: any, currentNode: TreeNodeData) => void
  nodeExpand: (data: any, node: TreeNodeData, instance: ComponentInternalInstance | null) => void
  nodeCollapse: (data: any, node: TreeNodeData, instance: ComponentInternalInstance | null) => void
  nodeDragStart: (node: TreeNodeData, event: DragEvent) => void
  nodeDragLeave: (dragNode: TreeNodeData, oldNode: TreeNodeData, event: DragEvent) => void
  nodeDragEnter: (dragNode: TreeNodeData, dropNode: TreeNodeData, event: DragEvent) => void
  nodeDragOver: (dragNode: TreeNodeData, dropNode: TreeNodeData, event: DragEvent) => void
  nodeDragEnd: (dragNode: TreeNodeData, dropNode: TreeNodeData | null, dropType: NodeDropType, event: DragEvent) => void
  nodeDrop: (dragNode: TreeNodeData, dropNode: TreeNodeData, dropType: NodeDropType, event: DragEvent) => void
}

export interface KTreeSlots {
  default: (_: { node: TreeNodeData, data: any }) => ComponentSlotType
  empty: () => ComponentSlotType
}

export type KTreeMethods = {
  filter: (value: any) => void
  updateKeyChildren: (key: TreeKey, data: TreeData) => void
  getCheckedNodes: (leafOnly?: boolean, includeHalfChecked?: boolean) => TreeNodeData[]
  setCheckedNodes: (nodes: Node[], leafOnly?: boolean) => void
  getCheckedKeys: (leafOnly?: boolean) => TreeKey[]
  setCheckedKeys: (keys: TreeKey[], leafOnly?: boolean) => void
  setChecked: (data: TreeKey | TreeNodeData, checked: boolean, deep: boolean) => void
  getHalfCheckedNodes: () => TreeNodeData[]
  getHalfCheckedKeys: () => TreeKey[]
  getCurrentKey: () => any
  getCurrentNode: () => TreeNodeData
  setCurrentKey: (key?: TreeKey, shouldAutoExpandParent?: boolean) => void
  setCurrentNode: (node?: Node, shouldAutoExpandParent?: boolean) => void
  getNode: (data: TreeKey | TreeNodeData) => Node
  remove: (data: TreeNodeData | Node) => void
  append: (data: TreeNodeData, parentNode: TreeNodeData | TreeKey | Node) => void
  insertBefore: (data: TreeKey | TreeNodeData | Node) => void
  insertAfter: (data: TreeKey | TreeNodeData | Node) => void
}