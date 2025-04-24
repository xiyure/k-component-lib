import { Ref, SetupContext, RenderFunction } from 'vue';
import type {
  SwitchProps as ElSwitchProps,
  SwitchEmits as ElSwitchEmits
} from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { SwitchProps  } from '../base';

export declare const KSwitch: DefineComponentApp<KSwitchProps, KSwitchEmits, KSwitchSlots>

export type KSwitchInstance = DefineComponentInstance<KSwitchProps, KSwitchConstructor>

export interface KSwitchConstructor extends ComponentBaseOptions, KSwitchMethods {
  props: KSwitchProps
  context: SetupContext<KSwitchEmits>
  getRefMaps(): KSwitchPrivateRef
  getComputeMaps(): KSwitchPrivateComputed
  renderVN: RenderFunction
}

export interface KSwitchPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KSwitchPrivateComputed {}

export type KSwitchProps = Merge<SwitchProps, ElSwitchProps>;
export type KSwitchEmits = ElSwitchEmits

export interface KSwitchSlots {
  'active-action': () => ComponentSlotType
  'inactive-action': () => ComponentSlotType
}

export type KSwitchMethods = {
  focus: () => void
}