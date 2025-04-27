import { Ref, SetupContext, RenderFunction } from 'vue';
import type { ElTooltipProps, PopperInstance, TooltipContentInstance, tooltipEmits as elTooltipEmits } from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { TooltipProps  } from '../base';

export declare const KTooltip: DefineComponentApp<KTooltipProps, KTooltipEmits, KTooltipSlots>

export type KTooltipInstance = DefineComponentInstance<KTooltipProps, KTooltipConstructor>

export interface KTooltipConstructor extends ComponentBaseOptions, KTooltipMethods {
  props: KTooltipProps
  context: SetupContext<KTooltipEmits>
  getRefMaps(): KTooltipPrivateRef
  getComputeMaps(): KTooltipPrivateComputed
  renderVN: RenderFunction
}

export interface KTooltipPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KTooltipPrivateComputed {}

export type KTooltipProps = Merge<TooltipProps, ElTooltipProps>;
export type KTooltipEmits = typeof elTooltipEmits;

export interface KTooltipSlots {
  default: () => ComponentSlotType
  content: () => ComponentSlotType
}

export type KTooltipMethods = {
  popperRef: Ref<PopperInstance | undefined>
  contentRef: Ref<TooltipContentInstance | undefined>
  isFocusInsideContent: () => boolean | undefined
  updatePopper: () => void
  onOpen: (e?: Event | undefined) => void
  onClose: (e?: Event | undefined) => void
  hide: (e?: Event | undefined) => void
}