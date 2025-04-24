
import { Ref, SetupContext, RenderFunction } from 'vue';
import { MenuItemRegistered } from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType } from '../common';
import type { MenuViewProps } from '../base';

export declare const KMenuView: DefineComponentApp<KMenuViewProps, KMenuViewEmits, KMenuViewSlots>

export type KMenuViewInstance = DefineComponentInstance<KMenuViewProps, KMenuViewConstructor>

export interface KMenuViewConstructor extends ComponentBaseOptions, KMenuViewMethods {
  props: KMenuViewProps
  context: SetupContext<KMenuViewEmits>
  getRefMaps(): KMenuViewPrivateRef
  getComputeMaps(): KMenuViewPrivateComputed
  renderVN: RenderFunction
}

export interface KMenuViewPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KMenuViewPrivateComputed {}

export type KMenuViewProps = MenuViewProps;

export type KMenuViewEmits = {
  click: (menuItem: MenuItemRegistered) => void
  select: (activeIndex: string | number) => void
}

export interface KMenuViewSlots {
  'app-logo': () => ComponentSlotType
  header: () => ComponentSlotType
  main: () => ComponentSlotType
  footer: () => ComponentSlotType
  [key: string]: () => ComponentSlotType
}

export type KMenuViewMethods = {
  collapse: () => void
  expand: () => void
  toggleExpand: () => void
}