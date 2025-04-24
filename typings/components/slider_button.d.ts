import { Ref, SetupContext, RenderFunction } from 'vue';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, } from '../common';
import type { SliderButtonProps } from '../base';

export declare const KSliderButton: DefineComponentApp<KSliderButtonProps, KSliderButtonEmits>

export type KSliderButtonInstance = DefineComponentInstance<KSliderButtonProps, KSliderButtonConstructor>

export interface KSliderButtonConstructor extends ComponentBaseOptions, KSliderButtonMethods {
  props: KSliderButtonProps
  context: SetupContext<KSliderButtonEmits>
  getRefMaps(): KSliderButtonPrivateRef
  getComputeMaps(): KSliderButtonPrivateComputed
  renderVN: RenderFunction
}

export interface KSliderButtonPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KSliderButtonPrivateComputed {}

export type KSliderButtonProps = SliderButtonProps;
export type KSliderButtonEmits = {
  change: (value: string) => void
}

export type KSliderButtonMethods = {}