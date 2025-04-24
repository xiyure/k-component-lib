
import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp,  DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import type { GFPageDetailsProps } from '../base';

export declare const GFPageDetails: DefineComponentApp<GFPageDetailsProps, GFPageDetailsEmits, GFPageDetailsSlots>

export type GFPageDetailsInstance = DefineComponentInstance<GFPageDetailsProps, GFPageDetailsConstructor>

export interface GFPageDetailsConstructor extends ComponentBaseOptions, GFPageDetailsMethods {
  props: GFPageDetailsProps
  context: SetupContext<GFPageDetailsEmits>
  getRefMaps(): GFPageDetailsPrivateRef
  getComputeMaps(): GFPageDetailsPrivateComputed
  renderVN: RenderFunction
}

export interface GFPageDetailsPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface GFPageDetailsPrivateComputed {}

export interface GFPageDetailsSlots {
  'extra-head': () => ComponentSlotType
  'head-title': () => ComponentSlotType
  'head-toolbar': () => ComponentSlotType
  'head-abstract': () => ComponentSlotType
  detail: () => ComponentSlotType
  [key: string]: () => ComponentSlotType
}

export interface GFPageDetailsEmits {}

export type GFPageDetailsMethods = {
  toggleActiveTab: (name: string) => void
}