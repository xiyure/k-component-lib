import { Ref, SetupContext, RenderFunction, StyleValue } from 'vue';
import type {
  InputProps as ElInputProps,
  InputEmits as ElInputEmits
} from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { InputProps  } from '../base';

export declare const KInput: DefineComponentApp<KInputProps, KInputEmits, KInputSlots>

export type KInputInstance = DefineComponentInstance<KInputProps, KInputConstructor>

export interface KInputConstructor extends ComponentBaseOptions, KInputMethods {
  props: KInputProps
  context: SetupContext<KInputEmits>
  getRefMaps(): KInputPrivateRef
  getComputeMaps(): KInputPrivateComputed
  renderVN: RenderFunction
}

export interface KInputPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KInputPrivateComputed {}

export type KInputProps = Merge<InputProps, ElInputProps>;
export type KInputEmits = Merge< {
  popperShow: () => void,
  popperHide: () => void,
}, ElInputEmits>

export interface KInputSlots {
  prefix?: () => ComponentSlotType
  suffix?: () => ComponentSlotType
  prepend?: () => ComponentSlotType
  append?: () => ComponentSlotType
  empty?: () => ComponentSlotType
}

export type KInputMethods = {
  blur: () => void
  focus: () => void
  clear: () => void
  input: Ref<HTMLInputElement | undefined>
  ref: Ref<HTMLInputElement | HTMLTextAreaElement | undefined>
  resizeTextarea: () => void
  select: () => void
  textarea: Ref<HTMLTextAreaElement | undefined>
  textareaStyle: Ref<StyleValue>
  isComposing: Ref<boolean>
}