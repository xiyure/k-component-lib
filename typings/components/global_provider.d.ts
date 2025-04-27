import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import type { GlobalProviderProps } from '../base';

export declare const KGlobalProvider: DefineComponentApp<KGlobalProviderProps, KGlobalProviderEmits, KGlobalProviderSlots>

export type KGlobalProviderInstance = DefineComponentInstance<KGlobalProviderProps, KGlobalProviderConstructor>

export interface KGlobalProviderConstructor extends ComponentBaseOptions, KGlobalProviderMethods {
  props: KGlobalProviderProps
  context: SetupContext<KGlobalProviderEmits>
  getRefMaps(): KGlobalProviderPrivateRef
  getComputeMaps(): KGlobalProviderPrivateComputed
  renderVN: RenderFunction
}

export interface KGlobalProviderPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KGlobalProviderPrivateComputed {}

export type KGlobalProviderProps = GlobalProviderProps;
export interface KGlobalProviderEmits {};

export interface KGlobalProviderSlots {
  default: () => ComponentSlotType
}

export type KGlobalProviderMethods = {}