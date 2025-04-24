
import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp,  DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import type { FilterFormProps } from '../base';

export declare const KFilterForm: DefineComponentApp<KFilterFormProps, KFilterFormEmits, KFilterFormSlots>

export type KFilterFormInstance = DefineComponentInstance<KFilterFormProps, KFilterFormConstructor>

export interface KFilterFormConstructor extends ComponentBaseOptions, KFilterFormMethods {
  props: KFilterFormProps
  context: SetupContext<KFilterFormEmits>
  getRefMaps(): KFilterFormPrivateRef
  getComputeMaps(): KFilterFormPrivateComputed
  renderVN: RenderFunction
}

export interface KFilterFormPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KFilterFormPrivateComputed {}

export type KFilterFormProps = FilterFormProps;
export type KFilterFormEmits = {
  search: (formData: { [prop: string]: any }) => void,
  reset: () => void,
  change: (formData: { [prop: string]: any }) => void
}

export interface KFilterFormSlots {
  action: () => ComponentSlotType;
}

export type KFilterFormMethods = {
  reset: () => void
  getFormData: () => any
  toggle: () => void
  expand: () => void
  collapse: () => void
}