import { Ref, SetupContext, RenderFunction } from 'vue';
import type {
  RadioProps as ElRadioProps,
  RadioEmits as ElRadioEmits,
  RadioGroupProps as ElRadioGroupProps,
  RadioGroupEmits as ElRadioGroupEmits
} from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { RadioProps, RadioGroupProps } from '../base';

// radio
export declare const KRadio: DefineComponentApp<KRadioProps, KRadioEmits, KRadioSlots>;

export type KRadioInstance = DefineComponentInstance<KRadioProps, KRadioConstructor>

export interface KRadioConstructor extends ComponentBaseOptions, KRadioMethods {
  props: KRadioProps
  context: SetupContext<KRadioEmits>
  getRefMaps(): KRadioPrivateRef
  getComputeMaps(): KRadioPrivateComputed
  renderVN: RenderFunction
}

export interface KRadioPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KRadioPrivateComputed {}

export type KRadioProps = Merge<RadioProps, ElRadioProps>;
export type KRadioEmits = ElRadioEmits;

export interface KRadioSlots {
  default: () => ComponentSlotType
}

export type KRadioMethods = {}

// radio-group
export declare const KRadioGroup: DefineComponentApp<KRadioGroupProps, KRadioGroupEmits, KRadioGroupSlots>;

export type KRadioGroupInstance = DefineComponentInstance<KRadioGroupProps, KRadioGroupConstructor>

export interface KRadioGroupConstructor extends ComponentBaseOptions, KRadioGroupMethods {
  props: KRadioGroupProps
  context: SetupContext<KRadioGroupEmits>
  getRefMaps(): KRadioGroupPrivateRef
  getComputeMaps(): KRadioGroupPrivateComputed
  renderVN: RenderFunction
}

export interface KRadioGroupPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KRadioGroupPrivateComputed {}

export type KRadioGroupProps = Merge<RadioGroupProps, ElRadioGroupProps>;
export type KRadioGroupEmits = ElRadioGroupEmits;

export interface KRadioGroupSlots {
  default: () => ComponentSlotType
}

export type KRadioGroupMethods = {}