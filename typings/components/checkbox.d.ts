import { Ref, SetupContext, RenderFunction } from 'vue';
import type {
  CheckboxProps as ElCheckboxProps,
  CheckboxEmits as ElCheckboxEmits,
  CheckboxGroupProps as ElCheckboxGroupProps,
  CheckboxGroupEmits as ElCheckboxGroupEmits
} from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { CheckboxProps, CheckboxGroupProps } from '../base';

// checkbox
export declare const KCheckbox: DefineComponentApp<KCheckboxProps, KCheckboxEmits, KCheckboxSlots>;

export type KCheckboxInstance = DefineComponentInstance<KCheckboxProps, KCheckboxConstructor>

export interface KCheckboxConstructor extends ComponentBaseOptions, KCheckboxMethods {
  props: KCheckboxProps
  context: SetupContext<KCheckboxEmits>
  getRefMaps(): KCheckboxPrivateRef
  getComputeMaps(): KCheckboxPrivateComputed
  renderVN: RenderFunction
}

export interface KCheckboxPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KCheckboxPrivateComputed {}

export type KCheckboxProps = Merge<CheckboxProps, ElCheckboxProps>;
export type KCheckboxEmits = ElCheckboxEmits;

export interface KCheckboxSlots {
  default: () => ComponentSlotType
}

export type KCheckboxMethods = {}

// checkbox-group
export declare const KCheckboxGroup: DefineComponentApp<KCheckboxGroupProps, KCheckboxGroupEmits, KCheckboxGroupSlots>;

export type KCheckboxGroupInstance = DefineComponentInstance<KCheckboxGroupProps, KCheckboxGroupConstructor>

export interface KCheckboxGroupConstructor extends ComponentBaseOptions, KCheckboxGroupMethods {
  props: KCheckboxGroupProps
  context: SetupContext<KCheckboxGroupEmits>
  getRefMaps(): KCheckboxGroupPrivateRef
  getComputeMaps(): KCheckboxGroupPrivateComputed
  renderVN: RenderFunction
}

export interface KCheckboxGroupPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KCheckboxGroupPrivateComputed {}

export type KCheckboxGroupProps = Merge<CheckboxGroupProps, ElCheckboxGroupProps>;
export type KCheckboxGroupEmits = ElCheckboxGroupEmits;

export interface KCheckboxGroupSlots {
  default: () => ComponentSlotType
}

export type KCheckboxGroupMethods = {}