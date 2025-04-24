import { Ref, SetupContext, RenderFunction } from 'vue';
import type {
  PopconfirmProps as ElPopconfirmProps,
  PopconfirmEmits as ElPopconfirmEmits
} from 'element-plus';
import { DefineComponentApp,  DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { PopconfirmProps  } from '../base';

export declare const KPopconfirm: DefineComponentApp<KPopconfirmProps, KPopconfirmEmits, KPopconfirmSlots>

export type KPopconfirmInstance = DefineComponentInstance<KPopconfirmProps, KPopconfirmConstructor>

export interface KPopconfirmConstructor extends ComponentBaseOptions, KPopconfirmMethods {
  props: KPopconfirmProps
  context: SetupContext<KPopconfirmEmits>
  getRefMaps(): KPopconfirmPrivateRef
  getComputeMaps(): KPopconfirmPrivateComputed
  renderVN: RenderFunction
}

export interface KPopconfirmPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KPopconfirmPrivateComputed {}

export type KPopconfirmProps = Merge<PopconfirmProps, ElPopconfirmProps>;
export type KPopconfirmEmits = ElPopconfirmEmits

export interface KPopconfirmSlots {
  reference: () => ComponentSlotType
  actions: (_: { confirm: (e: MouseEvent) => void, cancel: (e: MouseEvent) => void }) => ComponentSlotType
}

export type KPopconfirmMethods = {}