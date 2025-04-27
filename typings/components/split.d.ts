import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import type { SplitProps } from '../base';

export declare const KSplit: DefineComponentApp<KSplitProps, KSplitEmits, KSplitSlots>

export type KSplitInstance = DefineComponentInstance<KSplitProps, KSplitConstructor>

export interface KSplitConstructor extends ComponentBaseOptions, KSplitMethods {
  props: KSplitProps
  context: SetupContext<KSplitEmits>
  getRefMaps(): KSplitPrivateRef
  getComputeMaps(): KSplitPrivateComputed
  renderVN: RenderFunction
}

export interface KSplitPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KSplitPrivateComputed {}

export type KSplitProps = SplitProps;
export type KSplitEmits = {
  updateModelValue: (value: number | string) => void
  moveStart: (evt: MouseEvent) => void
  moving: (evt: MouseEvent) => void
  moveEnd: (evt: MouseEvent) => void
};

export interface KSplitSlots {
  first: () => ComponentSlotType
  second: () => ComponentSlotType
  trigger: () => ComponentSlotType
  'trigger-icon': () => ComponentSlotType
}

export type KSplitMethods = {}