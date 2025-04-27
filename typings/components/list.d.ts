
import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp,  DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import type { ListProps } from '../base';

export declare const KList: DefineComponentApp<KListProps, KListEmits, KListSlots>

export type KListInstance = DefineComponentInstance<KListProps, KListConstructor>

export interface KListConstructor extends ComponentBaseOptions, KListMethods {
  props: KListProps
  context: SetupContext<KListEmits>
  getRefMaps(): KListPrivateRef
  getComputeMaps(): KListPrivateComputed
  renderVN: RenderFunction
}

export interface KListPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KListPrivateComputed {}

export type KListProps = ListProps;
export type KListEmits = {
  load: () => void,
}

export interface KListSlots {
  default: () => ComponentSlotType;
}

export type KListMethods = {
  check: () => void
}