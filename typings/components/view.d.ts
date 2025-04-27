
import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';
import type { ViewProps, ViewData } from '../base';

export declare const KView: DefineComponentApp<KViewProps, KViewEmits, KViewSlots>


export type KViewInstance = DefineComponentInstance<KViewProps, KViewConstructor>

export interface KViewConstructor extends ComponentBaseOptions, KViewMethods {
  props: KViewProps
  context: SetupContext<KViewEmits>
  getRefMaps(): KViewPrivateRef
  getComputeMaps(): KViewPrivateComputed
  renderVN: RenderFunction
}

export interface KViewPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KViewPrivateComputed {}

export type KViewProps = ViewProps;
export type KViewEmits = {
  refresh: () => void,
  change: (changeInfo: { value: string | number, data: ViewData, node?: TreeNodeData }) => void,
  remove: (removeInfo: { value: string | number, data: ViewData }) => void,
  drag: (dragData:{ targetNode: any, lastOverNode: any, position: 'after' | 'before' | 'inner' }) => void,
  visible: (isVisible: boolean) => void,
  nodeExpand: (data: ViewData, node: TreeNodeData) => void,
  nodeCollapse: (data: ViewData, node: TreeNodeData) => void
};

export interface KViewSlots {
  default: () => ComponentSlotType
  header: () => ComponentSlotType
  refresh: () => ComponentSlotType
  label: (_: { data: ViewData, node?: TreeNodeData }) => ComponentSlotType
  'custom-header': () => ComponentSlotType
  [key: string]: () => ComponentSlotType
}

export type KViewMethods = {
  expand: () => void
  collapse: () => void
  toggle: () => void
  isExpand: () => void
  isCollapse: () => void
  getCurrentView: () => string | number
}