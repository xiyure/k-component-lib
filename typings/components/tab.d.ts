import { Ref, SetupContext, RenderFunction } from 'vue';
import type {
  TabsProps as ElTabsProps,
  TabsEmits as ElTabsEmits,
  TabPaneProps as ElTabPaneProps
} from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { TabsProps, TabPaneProps } from '../base';

// tabs
export declare const KTabs: DefineComponentApp<KTabsProps, KTabsEmits, KTabsSlots>;

export type KTabsInstance = DefineComponentInstance<KTabsProps, KTabsConstructor>

export interface KTabsConstructor extends ComponentBaseOptions, KTabsMethods {
  props: KTabsProps
  context: SetupContext<KTabsEmits>
  getRefMaps(): KTabsPrivateRef
  getComputeMaps(): KTabsPrivateComputed
  renderVN: RenderFunction
}

export interface KTabsPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KTabsPrivateComputed {}

export type KTabsProps = Merge<TabsProps, ElTabsProps>;
export type KTabsEmits = ElTabsEmits;

export interface KTabsSlots {
  default: () => ComponentSlotType
  'add-icon': () => ComponentSlotType
}

export type KTabsMethods = {}

// tab-pane
export declare const KTabPane: DefineComponentApp<KTabPaneProps, KTabPaneEmits, KTabPaneSlots>;

export type KTabPaneInstance = DefineComponentInstance<KTabPaneProps, KTabPaneConstructor>

export interface KTabPaneConstructor extends ComponentBaseOptions, KTabPaneMethods {
  props: KTabPaneProps
  context: SetupContext<KTabPaneEmits>
  getRefMaps(): KTabPanePrivateRef
  getComputeMaps(): KTabPanePrivateComputed
  renderVN: RenderFunction
}

export interface KTabPanePrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KTabPanePrivateComputed {}

export type KTabPaneProps = Merge<TabPaneProps, ElTabPaneProps>;

export interface KTabPaneEmits {}

export interface KTabPaneSlots {
  default: () => ComponentSlotType
  label: () => ComponentSlotType
}

export type KTabPaneMethods = {}