import { Ref, SetupContext, RenderFunction } from 'vue';
import type {
  DrawerProps as ElDrawerProps,
  drawerEmits as elDrawerEmits
} from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { DrawerProps  } from '../base';

export declare const KDrawer: DefineComponentApp<KDrawerProps, KDrawerEmits, KDrawerSlots>

export type KDrawerInstance = DefineComponentInstance<KDrawerProps, KDrawerConstructor>

export interface KDrawerConstructor extends ComponentBaseOptions, KDrawerMethods {
  props: KDrawerProps
  context: SetupContext<KDrawerEmits>
  getRefMaps(): KDrawerPrivateRef
  getComputeMaps(): KDrawerPrivateComputed
  renderVN: RenderFunction
}

export interface KDrawerPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KDrawerPrivateComputed {}

export type KDrawerProps = Merge<DrawerProps, ElDrawerProps>;
export type KDrawerEmits = typeof elDrawerEmits;

export interface KDrawerSlots {
  default: () => ComponentSlotType
  header: () => ComponentSlotType
  footer: () => ComponentSlotType
}

export type KDrawerMethods = {
  handleClose: () => void
}