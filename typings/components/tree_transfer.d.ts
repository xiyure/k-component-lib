
import { Ref, SetupContext, RenderFunction } from 'vue';
import { VxeColumnSlots } from 'vxe-table/types';
import { DefineComponentApp,  DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import type { TreeTransferProps, TreeTransferData, TablePaginationConfig, RowData } from '../base';

export declare const KTreeTransfer: DefineComponentApp<KTreeTransferProps, KTreeTransferEmits, KTreeTransferSlots>

export type KTreeTransferInstance = DefineComponentInstance<KTreeTransferProps, KTreeTransferConstructor>

export interface KTreeTransferConstructor extends ComponentBaseOptions, KTreeTransferMethods {
  props: KTreeTransferProps
  context: SetupContext<KTreeTransferEmits>
  getRefMaps(): KTreeTransferPrivateRef
  getComputeMaps(): KTreeTransferPrivateComputed
  renderVN: RenderFunction
}

export interface KTreeTransferPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KTreeTransferPrivateComputed {}

export type TreeTransferPageDirection = 'left' | 'right';
export type TreeTransferKey = string | number;

export type KTreeTransferProps = TreeTransferProps;
export type KTreeTransferEmits = {
  updateModelValue: (data: (string | number)[]) => void,
  change: (data: TreeTransferData[]) => void,
  drag: (data: TreeTransferData[]) => void,
  remoteQuery: (query: string) => void,
  serverPaging: (pageConfig: TablePaginationConfig & { position: TreeTransferPageDirection }) => void,
  pageCurrentChange: (current: number, position: TreeTransferPageDirection) => void,
  pageSizeChange: (size: number, position: TreeTransferPageDirection) => void,
  pageChange: (page: number, size: number, position: TreeTransferPageDirection) => void,
  pagePrevClick: (pageNum: number, position: TreeTransferPageDirection) => void,
  pageNextClick: (pageNum: number, position: TreeTransferPageDirection) => void,
};

export interface KTreeTransferSlots {
  empty: (_: { query: string }) => ComponentSlotType
  'left-cell': () => VxeColumnSlots['default']
  'right-header': VxeColumnSlots['header']
  'right-cell': () => VxeColumnSlots['default']
  'right-label': () => ComponentSlotType

  /**
* 已废弃，请使用 right-header
* @deprecated
*/
  rightHeader: VxeColumnSlots['header']
  /**
* 已废弃，请使用 right-cell
* @deprecated
*/
  rightCell: () => VxeColumnSlots['default']
  /**
* 已废弃，请使用 right-label
* @deprecated
*/
  rightLabel: () => ComponentSlotType
}

export type KTreeTransferMethods = {
  clearData: (deep?: boolean) => void,
  clearQuery: (position: TreeTransferPageDirection | undefined) => void,
  getQuery: () => string | string[]
  setAllCheckboxRow: (checked: boolean) => Promise<any>
  setCheckboxRow: (row: RowData | RowData[], checked: boolean) => Promise<any>
  clearCheckboxRow: () => Promise<any>
  clearCheckboxReserve: () => Promise<any>
  getCheckboxRecords: (isFull?: boolean) => RowData[]
  isCheckedRow: (row: RowData | TreeTransferKey) => boolean
}