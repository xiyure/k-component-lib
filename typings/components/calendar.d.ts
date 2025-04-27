import { Ref, SetupContext, RenderFunction, ComputedRef } from 'vue';
import type { CalendarProps as ElCalendarProps, CalendarEmits as ElCalendarEmits, dayjs, CalendarDateType } from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { CalendarProps } from '../base';

export declare const KCalendar: DefineComponentApp<KCalendarProps, KCalendarEmits, KCalendarSlots>;


export type KCalendarInstance = DefineComponentInstance<KCalendarProps, KCalendarConstructor>

export interface KCalendarConstructor extends ComponentBaseOptions, KCalendarMethods {
  props: KCalendarProps
  context: SetupContext<KCalendarEmits>
  getRefMaps(): KCalendarPrivateRef
  getComputeMaps(): KCalendarPrivateComputed
  renderVN: RenderFunction
}

export interface KCalendarPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KCalendarPrivateComputed {}

export type KCalendarProps = Merge<CalendarProps, ElCalendarProps>;

export type KCalendarEmits = ElCalendarEmits;

export interface KCalendarSlots {
  header: (_: { date: string}) => ComponentSlotType
  'date-cell': (_: { data: CalendarDateCellSlotData }) => ComponentSlotType
  schedule: (_: { date: Date }) => ComponentSlotType
}

export type KCalendarMethods = {
  jumpDate: (type: CalendarDateType) => void
  handleLunar: (showLunar: boolean) => void
  selectedDay: ComputedRef<dayjs.Dayjs | undefined>
  pickDay: (day: dayjs.Dayjs) => void
  selectDate: (date: CalendarDateType) => void
  calculateValidatedDateRange: (startDayjs: dayjs.Dayjs, endDayjs: dayjs.Dayjs) => [dayjs.Dayjs, dayjs.Dayjs][]
}

export type CalendarDateCellSlotData = {
  type: 'prev-month' | 'current-month' | 'next-month'
  isSelected: boolean
  day: string
  date: Date
}