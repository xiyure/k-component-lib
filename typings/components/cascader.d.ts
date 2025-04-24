import { Ref, SetupContext, RenderFunction, ComputedRef } from 'vue';
import type { CascaderProps as ElCascaderProps, CascaderEmits as ElCascaderEmits, CascaderNode as ElCascaderNode } from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { CascaderProps } from '../base';

export declare const KCascader: DefineComponentApp<KCascaderProps, KCascaderEmits, KCascaderSlots>;

export type KCascaderInstance = DefineComponentInstance<KCascaderProps, KCascaderConstructor>

export interface KCascaderConstructor extends ComponentBaseOptions, KCascaderMethods {
  props: KCascaderProps
  context: SetupContext<KCascaderEmits>
  getRefMaps(): KCascaderPrivateRef
  getComputeMaps(): KCascaderPrivateComputed
  renderVN: RenderFunction
}

export interface KCascaderPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KCascaderPrivateComputed {}

export type KCascaderProps = Merge<CascaderProps, ElCascaderProps>;

export type KCascaderEmits = ElCascaderEmits;

export interface KCascaderSlots {
  default: (_: { node: any, data: any }) => ComponentSlotType
  empty: () => ComponentSlotType
}

export type KCascaderMethods = {
  getCheckedNodes: (leafOnly: boolean) => CascaderNode[] | undefined
  cascaderPanelRef: ComputedRef<any>
  togglePopperVisible: (visible?: boolean) => void
  contentRef: ComputedRef<any>
  presentText: ComputedRef<string>
}