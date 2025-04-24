
import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import type { FilterProps } from '../base';

export declare const KTransferView: DefineComponentApp<KTransferViewProps, KTransferViewEmits, KTransferViewSlots>;

export type KTransferViewInstance = DefineComponentInstance<KTransferViewProps, KTransferViewConstructor>

export interface KTransferViewConstructor extends ComponentBaseOptions, KTransferViewMethods {
  props: KTransferViewProps
  context: SetupContext<KTransferViewEmits>
  getRefMaps(): KTransferViewPrivateRef
  getComputeMaps(): KTransferViewPrivateComputed
  renderVN: RenderFunction
}

export interface KTransferViewPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KTransferViewPrivateComputed {}

export type KTransferViewProps = FilterProps;

export interface KTransferViewSlots {
  header: () => ComponentSlotType
  footer: () => ComponentSlotType
}

export interface KTransferViewEmits {}

export type KTransferViewMethods = {
  handleSubmit: () => void
  handleSelectType: (value: string) => void
  handleCancel: () => void
}