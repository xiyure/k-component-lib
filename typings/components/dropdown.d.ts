
import { Ref, SetupContext, RenderFunction } from 'vue';
import type { ExtractPropTypes } from 'vue';
import type {
  dropdownProps as elDropdownProps,
  dropdownItemProps as elDropdownItemProps,
} from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { DropdownProps } from '../base';

// dropdown
export declare const KDropdown: DefineComponentApp<KDropdownProps, KDropdownEmits, KDropdownSlots>;

export type KDropdownInstance = DefineComponentInstance<KDropdownProps, KDropdownConstructor>

export interface KDropdownConstructor extends ComponentBaseOptions, KDropdownMethods {
  props: KDropdownProps
  context: SetupContext<KDropdownEmits>
  getRefMaps(): KDropdownPrivateRef
  getComputeMaps(): KDropdownPrivateComputed
  renderVN: RenderFunction
}

export interface KDropdownPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KDropdownPrivateComputed {}

export type KDropdownProps = Merge<DropdownProps, ExtractPropTypes<typeof elDropdownProps>>;
export type KDropdownEmits = {
  click: (event: MouseEvent) => void
  command: (command: string) => void
  visibleChange: (visible: boolean) => void
};

export interface KDropdownSlots {
  default: () => ComponentSlotType
  title: () => ComponentSlotType
}

export type KDropdownMethods = {
  handleOpen: () => void
  handleClose: () => void
}

// dropdown-item
export declare const KDropdownItem: DefineComponentApp<KDropdownItemProps, KDropdownItemEmits, KDropdownItemSlots>;

export type KDropdownItemInstance = DefineComponentInstance<KDropdownItemProps, KDropdownItemConstructor>

export interface KDropdownItemConstructor extends ComponentBaseOptions, KDropdownItemMethods {
  props: KDropdownItemProps
  context: SetupContext<KDropdownItemEmits>
  getRefMaps(): KDropdownItemPrivateRef
  getComputeMaps(): KDropdownItemPrivateComputed
  renderVN: RenderFunction
}

export interface KDropdownItemPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KDropdownItemPrivateComputed {}

export type KDropdownItemProps = ExtractPropTypes<typeof elDropdownItemProps>;
export type KDropdownItemEmits = {};

export interface KDropdownItemSlots {
  default: () => ComponentSlotType
}

export type KDropdownItemMethods = {}