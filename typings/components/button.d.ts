import { Ref, SetupContext, RenderFunction, ComputedRef } from 'vue';
import type { ButtonProps as ElButtonProps, ButtonEmits, ButtonType } from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { ButtonProps, CompSize } from '../base';

export declare const KButton: DefineComponentApp<KButtonProps, KButtonEmits, KButtonSlots>

export type KButtonInstance = DefineComponentInstance<KButtonProps, KButtonConstructor>

export interface KButtonConstructor extends ComponentBaseOptions, KButtonMethods {
  props: KButtonProps
  context: SetupContext<KButtonEmits>
  getRefMaps(): KButtonPrivateRef
  getComputeMaps(): KButtonPrivateComputed
  renderVN: RenderFunction
}

export interface KButtonPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KButtonPrivateComputed {}

export type KButtonProps = Merge<ButtonProps, ElButtonProps>;

export type KButtonEmits = ButtonEmits;

export interface KButtonSlots {
  default: () => ComponentSlotType
  'icon-left': () => ComponentSlotType
  'icon-right': () => ComponentSlotType

  /**
* 已废弃，请使用 icon-left
* @deprecated
*/
  iconLeft: () => ComponentSlotType
  /**
* 已废弃，请使用 icon-right
* @deprecated
*/
  iconRight: () => ComponentSlotType
}

export type KButtonMethods = {
  ref: Ref<HTMLButtonElement>
  size: ComputedRef<CompSize>
  type: ComputedRef<ButtonType>
  disabled: ComputedRef<boolean>
  shouldAddSpace: ComputedRef<boolean>
}