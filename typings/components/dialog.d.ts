import { Ref, SetupContext, RenderFunction } from 'vue';
import type {
  DialogProps as ElDialogProps,
  DialogEmits as ElDialogEmits
} from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { DialogProps  } from '../base';

export declare const KDialog: DefineComponentApp<KDialogProps, KDialogEmits, KDialogSlots>

export type KDialogInstance = DefineComponentInstance<KDialogProps, KDialogConstructor>

export interface KDialogConstructor extends ComponentBaseOptions, KDialogMethods {
  props: KDialogProps
  context: SetupContext<KDialogEmits>
  getRefMaps(): KDialogPrivateRef
  getComputeMaps(): KDialogPrivateComputed
  renderVN: RenderFunction
}

export interface KDialogPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KDialogPrivateComputed {}

export type KDialogProps = Merge<DialogProps, ElDialogProps>;
export type KDialogEmits = ElDialogEmits

export interface KDialogSlots {
  default: () => ComponentSlotType
  header: () => ComponentSlotType
  footer: () => ComponentSlotType
}

export type KDialogMethods = {
  resetPosition: () => void
}