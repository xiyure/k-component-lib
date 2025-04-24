
import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp,  DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import type { PageTableViewProps } from '../base';

export declare const KPageTableView: DefineComponentApp<KPageTableViewProps, KPageTableViewEmits, KPageTableViewSlots>

export type KPageTableViewInstance = DefineComponentInstance<KPageTableViewProps, KPageTableViewConstructor>

export interface KPageTableViewConstructor extends ComponentBaseOptions, KPageTableViewMethods {
  props: KPageTableViewProps
  context: SetupContext<KPageTableViewEmits>
  getRefMaps(): KPageTableViewPrivateRef
  getComputeMaps(): KPageTableViewPrivateComputed
  renderVN: RenderFunction
}

export interface KPageTableViewPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KPageTableViewPrivateComputed {}

export type KPageTableViewProps = PageTableViewProps;
export type KPageTableViewEmits = {
  refresh: () => void
}

export interface KPageTableViewSlots {
  default: () => ComponentSlotType
  'aside-tool-bar': () => ComponentSlotType
  aside: () => ComponentSlotType
  'aside-foot': () => ComponentSlotType
  toolbar: () => ComponentSlotType
}

export type KPageTableViewMethods = {}