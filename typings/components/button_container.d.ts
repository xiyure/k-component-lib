import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import type { ButtonContainerProps } from '../base';

export declare const KButtonContainer: DefineComponentApp<KButtonContainerProps, KButtonContainerEmits, KButtonContainerSlots>

export type KButtonContainerInstance = DefineComponentInstance<KButtonContainerProps, KButtonContainerConstructor>

export interface KButtonContainerConstructor extends ComponentBaseOptions, KButtonContainerMethods {
  props: KButtonContainerProps
  context: SetupContext<KButtonContainerEmits>
  getRefMaps(): KButtonContainerPrivateRef
  getComputeMaps(): KButtonContainerPrivateComputed
  renderVN: RenderFunction
}

export type KButtonContainerProps = ButtonContainerProps;

export interface KButtonContainerPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KButtonContainerPrivateComputed {}

export interface KButtonContainerSlots {
  default: () => ComponentSlotType
  trigger: () => ComponentSlotType
}

export interface KButtonContainerEmits {}

export type KButtonContainerMethods = {}