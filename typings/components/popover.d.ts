import { Ref, SetupContext, RenderFunction } from 'vue';
import type {
  PopoverProps as ElPopoverProps,
  PopoverEmits as ElPopoverEmits
} from 'element-plus';
import { DefineComponentApp,  DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { PopoverProps  } from '../base';

export declare const KPopover: DefineComponentApp<KPopoverProps, KPopoverEmits, KPopoverSlots>

export type KPopoverInstance = DefineComponentInstance<KPopoverProps, KPopoverConstructor>

export interface KPopoverConstructor extends ComponentBaseOptions, KPopoverMethods {
  props: KPopoverProps
  context: SetupContext<KPopoverEmits>
  getRefMaps(): KPopoverPrivateRef
  getComputeMaps(): KPopoverPrivateComputed
  renderVN: RenderFunction
}

export interface KPopoverPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KPopoverPrivateComputed {}

export type KPopoverProps = Merge<PopoverProps, ElPopoverProps>;
export type KPopoverEmits = ElPopoverEmits

export interface KPopoverSlots {
  default: () => ComponentSlotType
  reference: () => ComponentSlotType
}

export type KPopoverMethods = {
  hide: () => void
}