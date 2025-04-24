
import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import type { ScriptInputProps, ChangeEventParams, ScriptInputMode, RowData, Row } from '../base';

export declare const KScriptInput: DefineComponentApp<KScriptInputProps, KScriptInputEmits, KScriptInputSlots>

export type KScriptInputInstance = DefineComponentInstance<KScriptInputProps, KScriptInputConstructor>

export interface KScriptInputConstructor extends ComponentBaseOptions, KScriptInputMethods {
  props: KScriptInputProps
  context: SetupContext<KScriptInputEmits>
  getRefMaps(): KScriptInputPrivateRef
  getComputeMaps(): KScriptInputPrivateComputed
  renderVN: RenderFunction
}

export interface KScriptInputPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KScriptInputPrivateComputed {}

export type KScriptInputProps = ScriptInputProps;
export type KScriptInputEmits = {
  updateModelValue: (value: string) => void
  change: (data: ChangeEventParams) => void,
  input: (value: string) => void
  focus: (evt: FocusEvent) => void
  blur: (evt: FocusEvent) => void
  select:(data: RowData | Row) => void
  modeChange: (mode: ScriptInputMode) => void
}

export interface KScriptInputSlots {
  prepend: () => ComponentSlotType
  append: () => ComponentSlotType
  option: () => ComponentSlotType
}

export type KScriptInputMethods = {
  clear: () => void
  showPopper: () => void
  hidePopper: () => void
  toggleMode: () => void
  setStringMode: (isStringMode: boolean) => void
  getCurrentMode: () => ScriptInputMode
  setCurrentMode: (mode: ScriptInputMode) => void 
  isStringMode: () => boolean
  focus: () => void
  blur: () => void
}