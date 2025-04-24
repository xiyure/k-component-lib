import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import type { OperateProps } from '../base';

export declare const KOperate: DefineComponentApp<KOperateProps, KOperateEmits, KOperateSlots>

export type KOperateInstance = DefineComponentInstance<KOperateProps, KOperateConstructor>

export interface KOperateConstructor extends ComponentBaseOptions, KOperateMethods {
  props: KOperateProps
  context: SetupContext<KOperateEmits>
  getRefMaps(): KOperatePrivateRef
  getComputeMaps(): KOperatePrivateComputed
  renderVN: RenderFunction
}

export interface KOperatePrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KOperatePrivateComputed {}

export type KOperateProps = OperateProps;
export type KOperateEmits = {
  close: () => void
}

export interface KOperateSlots {
  trigger: () => ComponentSlotType
}

export type KOperateMethods = {
  close: () => void
}