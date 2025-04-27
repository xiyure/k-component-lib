
import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import type { ResultProps } from '../base';

export declare const KResult: DefineComponentApp<KResultProps, KResultEmits, KResultSlots>

export type KResultInstance = DefineComponentInstance<KResultProps, KResultConstructor>

export interface KResultConstructor extends ComponentBaseOptions, KResultMethods {
  props: KResultProps
  context: SetupContext<KResultEmits>
  getRefMaps(): KResultPrivateRef
  getComputeMaps(): KResultPrivateComputed
  renderVN: RenderFunction
}

export interface KResultPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KResultPrivateComputed {}

export type KResultProps = ResultProps;
export interface KResultEmits {}

export interface KResultSlots {
  title: () => ComponentSlotType
  icon: () => ComponentSlotType
  extra: () => ComponentSlotType
}

export type KResultMethods = {}