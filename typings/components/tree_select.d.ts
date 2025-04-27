import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType,  Merge } from '../common';
import type { TreeSelectProps  } from '../base';
import { KSelectProps, KSelectEmits, KSelectSlots, KSelectMethods } from './select';
import { KTreeProps, KTreeEmits, KTreeSlots, KTreeMethods } from './tree';
import { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';

export declare const KTreeSelect: DefineComponentApp<KTreeSelectProps, KTreeSelectEmits, KTreeSelectSlots>

export type KTreeSelectInstance = DefineComponentInstance<KTreeSelectProps, KTreeSelectConstructor>

export interface KTreeSelectConstructor extends ComponentBaseOptions, KTreeSelectMethods {
  props: KTreeSelectProps
  context: SetupContext<KTreeSelectEmits>
  getRefMaps(): KTreeSelectPrivateRef
  getComputeMaps(): KTreeSelectPrivateComputed
  renderVN: RenderFunction
}

export interface KTreeSelectPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KTreeSelectPrivateComputed {}

export type KTreeSelectProps = Merge<TreeSelectProps, KSelectProps & KTreeProps>;
export type KTreeSelectEmits = KSelectEmits & KTreeEmits;
export type KTreeSelectSlots = Merge<{
  default: (_: { node: TreeNodeData, data: any }) => ComponentSlotType
  empty: (_: { query: string }) => ComponentSlotType
}, Merge<KTreeSlots, KSelectSlots>>;

export interface KTreeSelectMethods extends KSelectMethods, KTreeMethods {}