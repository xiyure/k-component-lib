import { Ref, SetupContext, RenderFunction } from 'vue';
import type { DatePickerProps as ElDatePickerProps } from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { DatePickerProps  } from '../base';

export declare const KDatePicker: DefineComponentApp<KDatePickerProps, KDatePickerEmits, KDatePickerSlots>

export type KDatePickerInstance = DefineComponentInstance<KDatePickerProps, KDatePickerConstructor>

export interface KDatePickerConstructor extends ComponentBaseOptions, KDatePickerMethods {
  props: KDatePickerProps
  context: SetupContext<KDatePickerEmits>
  getRefMaps(): KDatePickerPrivateRef
  getComputeMaps(): KDatePickerPrivateComputed
  renderVN: RenderFunction
}

export interface KDatePickerPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KDatePickerPrivateComputed {}

export type KDatePickerProps = Merge<DatePickerProps, ElDatePickerProps>;

export interface KDatePickerEmits {
  change: (val: number | string | Date | [Date, Date] | [string, string]) => void,
  blur: (e: FocusEvent) => void,
  focus: (e: FocusEvent) => void,
  clear: () => void,
  calendarChange: (val: [Date, null | Date]) => void,
  panelChange: (date: Date | [Date, Date], mode: 'month' | 'year', view?: string) => void
  visibleChange: (visibility: boolean) => void
};

export interface KDatePickerSlots {
  default: () => ComponentSlotType
  'range-separator': () => ComponentSlotType
  'prev-month': () => ComponentSlotType
  'next-month': () => ComponentSlotType
  'prev-year': () => ComponentSlotType
  'next-year': () => ComponentSlotType
}

export type KDatePickerMethods = {
  focus: () => void
  blur: () => void
  handleOpen: () => void
  handleClose: () => void
}