import { Ref, SetupContext, RenderFunction } from 'vue';
import type {
  CollapseProps as ElCollapseProps,
  CollapseEmits as ElCollapseEmits,
  CollapseItemProps as ElCollapseItemProps
} from 'element-plus'
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType,  Merge } from '../common';
import type { CollapseProps, CollapseItemProps } from '../base';

// collapse
export declare const KCollapse: DefineComponentApp<KCollapseProps, KCollapseEmits, KCollapseSlots>;

export type KCollapseInstance = DefineComponentInstance<KCollapseProps, KCollapseConstructor>

export interface KCollapseConstructor extends ComponentBaseOptions, KCollapseMethods {
  props: KCollapseProps
  context: SetupContext<KCollapseEmits>
  getRefMaps(): KCollapsePrivateRef
  getComputeMaps(): KCollapsePrivateComputed
  renderVN: RenderFunction
}

export interface KCollapsePrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KCollapsePrivateComputed {}
export type KCollapseProps = Merge<CollapseProps, ElCollapseProps>;
export type KCollapseEmits = ElCollapseEmits;

export interface KCollapseSlots {
  default: () => ComponentSlotType
}

export type KCollapseMethods = {}

// collapse-item
export declare const KCollapseItem: DefineComponentApp<KCollapseItemProps, KCollapseItemEmits, KCollapseItemSlots>;

export type KCollapseItemInstance = DefineComponentInstance<KCollapseItemProps, KCollapseItemConstructor>

export interface KCollapseItemConstructor extends ComponentBaseOptions, KCollapseItemMethods {
  props: KCollapseItemProps
  context: SetupContext<KCollapseItemEmits>
  getRefMaps(): KCollapseItemPrivateRef
  getComputeMaps(): KCollapseItemPrivateComputed
  renderVN: RenderFunction
}

export interface KCollapseItemPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KCollapseItemPrivateComputed {}
export type KCollapseItemProps = Merge<CollapseItemProps, ElCollapseItemProps>;
export interface KCollapseItemEmits {}

export interface KCollapseItemSlots {
  default: () => ComponentSlotType
  title: () => ComponentSlotType
  icon: (_: { isActive: boolean }) => ComponentSlotType
}

export type KCollapseItemMethods = {}