
import { Ref, SetupContext, RenderFunction } from 'vue';import type {
  PaginationProps as ElPaginationProps,
  PaginationEmits as ElPaginationEmits
} from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { PaginationProps  } from '../base';

export declare const KPagination: DefineComponentApp<KPaginationProps, KPaginationEmits, KPaginationSlots>

export type KPaginationInstance = DefineComponentInstance<KPaginationProps, KPaginationConstructor>

export interface KPaginationConstructor extends ComponentBaseOptions, KPaginationMethods {
  props: KPaginationProps
  context: SetupContext<KPaginationEmits>
  getRefMaps(): KPaginationPrivateRef
  getComputeMaps(): KPaginationPrivateComputed
  renderVN: RenderFunction
}

export interface KPaginationPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KPaginationPrivateComputed {}

export type KPaginationProps = Merge<PaginationProps, ElPaginationProps>;
export type KPaginationEmits = ElPaginationEmits

export interface KPaginationSlots {
  default: () => ComponentSlotType
}

export type KPaginationMethods = {}