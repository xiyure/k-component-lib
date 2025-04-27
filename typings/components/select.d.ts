import { Ref, SetupContext, RenderFunction, ComputedRef } from 'vue';
import type { ISelectProps } from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { SelectProps } from '../base';

// select
export declare const KSelect: DefineComponentApp<KSelectProps, KSelectEmits, KSelectSlots>;

export type KSelectInstance = DefineComponentInstance<KSelectProps, KSelectConstructor>

export interface KSelectConstructor extends ComponentBaseOptions, KSelectMethods {
  props: KSelectProps
  context: SetupContext<KSelectEmits>
  getRefMaps(): KSelectPrivateRef
  getComputeMaps(): KSelectPrivateComputed
  renderVN: RenderFunction
}

export interface KSelectPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KSelectPrivateComputed {}

export type KSelectProps = Merge<SelectProps, ISelectProps>;
export type KSelectEmits = {
  updateModelValue: (value: any) => void
  change: (value: any) => void
  removeTag: (tagValue: any) => void
  clear: () => void
  visibleChange: (visible: boolean) => void
  focus: (evt: FocusEvent) => void
  blur: (evt: FocusEvent) => void
};

export interface KSelectSlots {
  default: () => ComponentSlotType
  header: () => ComponentSlotType
  footer: () => ComponentSlotType
  prefix: () => ComponentSlotType
  empty: () => ComponentSlotType
  tag: () => ComponentSlotType
  loading: () => ComponentSlotType
  label: () => ComponentSlotType
}

export type KSelectMethods = {
  focus: () => void
  blur: () => void
  selectedLabel: ComputedRef<string | string[]>
}

// option group
export declare const KOptionGroup: DefineComponentApp<KOptionGroupProps, KOptionGroupEmits, KOptionGroupSlots>;

export type KOptionGroupInstance = DefineComponentInstance<KOptionGroupProps, KOptionGroupConstructor>

export interface KOptionGroupConstructor extends ComponentBaseOptions, KOptionGroupMethods {
  props: KOptionGroupProps
  context: SetupContext<KOptionGroupEmits>
  getRefMaps(): KOptionGroupPrivateRef
  getComputeMaps(): KOptionGroupPrivateComputed
  renderVN: RenderFunction
}

export interface KOptionGroupPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KOptionGroupPrivateComputed {}

export type KOptionGroupProps = {
  label: string | number
  disabled?: boolean
}

export interface KOptionGroupEmits {}

export interface KOptionGroupSlots {
  default: () => ComponentSlotType
}

export type KOptionGroupMethods = {}

// option
export declare const KOption: DefineComponentApp<KOptionProps, KOptionEmits, KOptionSlots>;

export type KOptionInstance = DefineComponentInstance<KOptionProps, KOptionConstructor>

export interface KOptionConstructor extends ComponentBaseOptions, KOptionMethods {
  props: KOptionProps
  context: SetupContext<KOptionEmits>
  getRefMaps(): KOptionPrivateRef
  getComputeMaps(): KOptionPrivateComputed
  renderVN: RenderFunction
}

export interface KOptionPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KOptionPrivateComputed {}

export type KOptionProps = {
  value?: string | number | boolean | { [key: string]: any }
  label?: string | number
  disabled?: boolean
}

export interface KOptionEmits {}

export interface KOptionSlots {
  default: () => ComponentSlotType
}

export type KOptionMethods = {}