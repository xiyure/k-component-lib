import { Ref, SetupContext, RenderFunction } from 'vue';
import type {
  TransferProps as ElTransferProps,
  TransferEmits as ElTransferEmits
} from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { TransferProps } from '../base';

export declare const KTransfer: DefineComponentApp<KTransferProps, KTransferEmits, KTransferSlots>

export type KTransferInstance = DefineComponentInstance<KTransferProps, KTransferConstructor>

export interface KTransferConstructor extends ComponentBaseOptions, KTransferMethods {
  props: KTransferProps
  context: SetupContext<KTransferEmits>
  getRefMaps(): KTransferPrivateRef
  getComputeMaps(): KTransferPrivateComputed
  renderVN: RenderFunction
}

export interface KTransferPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KTransferPrivateComputed {}

export type KTransferProps = Merge<TransferProps, ElTransferProps>;
export type KTransferEmits = Merge<
  {
    reset: (defaultKeys: string[] | number[]) => void
    drag: (data: any) => void
  }, ElTransferEmits
>

export interface KTransferSlots {
  default: () => ComponentSlotType
  'drag-icon': () => ComponentSlotType
  'left-footer': () => ComponentSlotType
  'right-footer': () => ComponentSlotType
  'left-empty': () => ComponentSlotType
  'right-empty': () => ComponentSlotType
  /**
* 已废弃，请使用 drag-icon
* @deprecated
*/
  dragIcon: () => ComponentSlotType
}

export type KTransferMethods = {
  getTransferData: () => { sourceData: any[], selectData: any[] }
  clearQuery: (which?: 'left' | 'right' | undefined) => void
  leftPanel: Ref<any>
  rightPanel: Ref<any>
}