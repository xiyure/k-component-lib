import { Ref, SetupContext, RenderFunction } from 'vue';
import type { TagProps as ElTagProps, TagEmits as ElTagEmits } from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { TagProps  } from '../base';

export declare const KTag: DefineComponentApp<KTagProps, KTagEmits, KTagSlots>

export type KTagInstance = DefineComponentInstance<KTagProps, KTagConstructor>

export interface KTagConstructor extends ComponentBaseOptions, KTagMethods {
  props: KTagProps
  context: SetupContext<KTagEmits>
  getRefMaps(): KTagPrivateRef
  getComputeMaps(): KTagPrivateComputed
  renderVN: RenderFunction
}

export interface KTagPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KTagPrivateComputed {}

export type KTagProps = Merge<TagProps, ElTagProps>;
export type KTagEmits = ElTagEmits

export interface KTagSlots {
  default: () => ComponentSlotType
}

export type KTagMethods = {}