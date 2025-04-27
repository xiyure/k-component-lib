
import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import type { PageDetailsProps } from '../base';

export declare const KPageDetails: DefineComponentApp<KPageDetailsProps, KPageDetailsEmits, KPageDetailsSlots>

export type KPageDetailsInstance = DefineComponentInstance<KPageDetailsProps, KPageDetailsConstructor>

export interface KPageDetailsConstructor extends ComponentBaseOptions, KPageDetailsMethods {
  props: KPageDetailsProps
  context: SetupContext<KPageDetailsEmits>
  getRefMaps(): KPageDetailsPrivateRef
  getComputeMaps(): KPageDetailsPrivateComputed
  renderVN: RenderFunction
}

export interface KPageDetailsPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KPageDetailsPrivateComputed {}

export type KPageDetailsProps = PageDetailsProps;

export interface KPageDetailsSlots {
  'extra-head': () => ComponentSlotType
  'head-title': () => ComponentSlotType
  'head-toolbar': () => ComponentSlotType
  'head-abstract': () => ComponentSlotType
  default: () => ComponentSlotType
}

export interface KPageDetailsEmits {}

export type KPageDetailsMethods = {}