
import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import type { IconPopoverProps } from '../base';

export declare const KIconPopover: DefineComponentApp<KIconPopoverProps, KIconPopoverEmits, KIconPopoverSlots>

export type KIconPopoverInstance = DefineComponentInstance<KIconPopoverProps, KIconPopoverConstructor>

export interface KIconPopoverConstructor extends ComponentBaseOptions, KIconPopoverMethods {
  props: KIconPopoverProps
  context: SetupContext<KIconPopoverEmits>
  getRefMaps(): KIconPopoverPrivateRef
  getComputeMaps(): KIconPopoverPrivateComputed
  renderVN: RenderFunction
}

export interface KIconPopoverPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KIconPopoverPrivateComputed {}

export type KIconPopoverProps = IconPopoverProps;
export type KIconPopoverEmits = {
  updateIcon: () => void
}

export interface KIconPopoverSlots {
  default: () => ComponentSlotType;
}

export type KIconPopoverMethods = {}