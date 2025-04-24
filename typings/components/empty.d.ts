import { Ref, SetupContext, RenderFunction } from 'vue';
import type {
  EmptyProps as ElEmptyProps
} from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { EmptyProps  } from '../base';

export declare const KEmpty: DefineComponentApp<KEmptyProps, KEmptyEmits, KEmptySlots>

export type KEmptyInstance = DefineComponentInstance<KEmptyProps, KEmptyConstructor>

export interface KEmptyConstructor extends ComponentBaseOptions, KEmptyMethods {
  props: KEmptyProps
  context: SetupContext<KEmptyEmits>
  getRefMaps(): KEmptyPrivateRef
  getComputeMaps(): KEmptyPrivateComputed
  renderVN: RenderFunction
}

export interface KEmptyPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KEmptyPrivateComputed {}

export type KEmptyProps = Merge<EmptyProps, ElEmptyProps>;

export interface KEmptyEmits {}

export interface KEmptySlots {
  default: () => ComponentSlotType
  icon: () => ComponentSlotType
  description: () => ComponentSlotType
}

export type KEmptyMethods = {}