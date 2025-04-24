
import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import type { FilterProps, ConditionInfo, FilterData } from '../base';

export declare const KFilter: DefineComponentApp<KFilterProps, KFilterEmits, KFilterSlots>

export type KFilterInstance = DefineComponentInstance<KFilterProps, KFilterConstructor>

export interface KFilterConstructor extends ComponentBaseOptions, KFilterMethods {
  props: KFilterProps
  context: SetupContext<KFilterEmits>
  getRefMaps(): KFilterPrivateRef
  getComputeMaps(): KFilterPrivateComputed
  renderVN: RenderFunction
}

export interface KFilterPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KFilterPrivateComputed {}

export type KFilterProps = FilterProps;
export type KFilterEmits = {
  confirm: (condition: ConditionInfo, data?: any[]) => void,
  clear: () => void
  show: () => void
  hide: () => void
}

export interface KFilterSlots {
  reference: (_: { hasConfigCondition: (FilterData & { [key: string]: any })[] }) => ComponentSlotType
}

export type KFilterMethods = {
  filter: (data?: any[]) => Promise<{data: any[], condition: ConditionInfo}>
  clearFilter: () => void
  getConditionInfo: () => ConditionInfo
}