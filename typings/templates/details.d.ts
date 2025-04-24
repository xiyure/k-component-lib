import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions } from '../common';
import type { DetailsProps, DetailsItemProps } from '../base';

// details
export declare const KDetails: DefineComponentApp<KDetailsProps, KDetailsEmits>;

export type KDetailsInstance = DefineComponentInstance<KDetailsProps, KDetailsConstructor>

export interface KDetailsConstructor extends ComponentBaseOptions, KDetailsMethods {
  props: KDetailsProps
  context: SetupContext<KDetailsEmits>
  getRefMaps(): KDetailsPrivateRef
  getComputeMaps(): KDetailsPrivateComputed
  renderVN: RenderFunction
}

export interface KDetailsPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KDetailsPrivateComputed {}

export type KDetailsProps = DetailsProps;

export interface KDetailsEmits {}

export interface KDetailsMethods {}

// details-item
export declare const KDetailsItem: DefineComponentApp<KDetailsItemProps, KDetailsItemEmits>;
export type KDetailsItemInstance = DefineComponentInstance<KDetailsProps, KDetailsConstructor>

export interface KDetailsConstructor extends ComponentBaseOptions, KDetailsItemMethods {
  props: KDetailsProps
  context: SetupContext<KDetailsItemEmits>
  getRefMaps(): KDetailsPrivateRef
  getComputeMaps(): KDetailsPrivateComputed
  renderVN: RenderFunction
}

export interface KDetailsPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KDetailsPrivateComputed {}

export type KDetailsItemProps = DetailsItemProps;

export interface KDetailsItemEmits {}

export interface KDetailsItemMethods {}