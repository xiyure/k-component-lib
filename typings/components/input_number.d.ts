import { Ref, SetupContext, RenderFunction } from 'vue';
import type {
  InputNumberProps as ElInputNumberProps,
  InputNumberEmits as ElInputNumberEmits
} from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { InputNumberProps  } from '../base';

export declare const KInputNumber: DefineComponentApp<KInputNumberProps, KInputNumberEmits, KInputNumberSlots>

export type KInputNumberInstance = DefineComponentInstance<KInputNumberProps, KInputNumberConstructor>

export interface KInputNumberConstructor extends ComponentBaseOptions, KInputNumberMethods {
  props: KInputNumberProps
  context: SetupContext<KInputNumberEmits>
  getRefMaps(): KInputNumberPrivateRef
  getComputeMaps(): KInputNumberPrivateComputed
  renderVN: RenderFunction
}

export interface KInputNumberPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KInputNumberPrivateComputed {}

export type KInputNumberProps = Merge<InputNumberProps, ElInputNumberProps>;
export type KInputNumberEmits = ElInputNumberEmits

export interface KInputNumberSlots {
  'decrease-icon': () => ComponentSlotType
  'increase-icon': () => ComponentSlotType
  prefix: () => ComponentSlotType
  suffix: () => ComponentSlotType
}

export type KInputNumberMethods = {
  focus: () => void
  blur: () => void
}