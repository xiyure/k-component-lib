import { Ref, SetupContext, RenderFunction } from 'vue';
import type { BadgeProps as ElBadgeProps } from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { BadgeProps } from '../base';

export declare const KBadge: DefineComponentApp<KBadgeProps, KBadgeEmits, KBadgeSlots>

export type KBadgeInstance = DefineComponentInstance<KBadgeProps, KBadgeConstructor>

export interface KBadgeConstructor extends ComponentBaseOptions, KBadgeMethods {
  props: KBadgeProps
  context: SetupContext<KBadgeEmits>
  getRefMaps(): KBadgePrivateRef
  getComputeMaps(): KBadgePrivateComputed
  renderVN: RenderFunction
}

export interface KBadgePrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KBadgePrivateComputed {}

export type KBadgeProps = Merge<BadgeProps, ElBadgeProps>;

export interface KBadgeSlots {
  default: () => ComponentSlotType
  content: (_: { value: string }) => ComponentSlotType
}

export interface KBadgeEmits {}

export type KBadgeMethods = {}