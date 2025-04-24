import { Ref, SetupContext, RenderFunction } from 'vue';
import type {
  StepsProps as ElStepsProps,
  StepsEmits as ElStepsEmits,
  StepProps as ElStepProps
} from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { StepsProps, StepProps } from '../base';

// steps
export declare const KSteps: DefineComponentApp<KStepsProps, KStepsEmits, KStepsSlots>;

export type KStepsInstance = DefineComponentInstance<KStepsProps, KStepsConstructor>

export interface KStepsConstructor extends ComponentBaseOptions, KStepsMethods {
  props: KStepsProps
  context: SetupContext<KStepsEmits>
  getRefMaps(): KStepsPrivateRef
  getComputeMaps(): KStepsPrivateComputed
  renderVN: RenderFunction
}

export interface KStepsPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KStepsPrivateComputed {}

export type KStepsProps = Merge<StepsProps, ElStepsProps>;
export type KStepsEmits = ElStepsEmits;

export interface KStepsSlots {
  default: () => ComponentSlotType
}

export type KStepsMethods = {}

// step
export declare const KStep: DefineComponentApp<KStepProps, KStepEmits, KStepSlots>;

export type KStepInstance = DefineComponentInstance<KStepProps, KStepConstructor>

export interface KStepConstructor extends ComponentBaseOptions, KStepMethods {
  props: KStepProps
  context: SetupContext<KStepEmits>
  getRefMaps(): KStepPrivateRef
  getComputeMaps(): KStepPrivateComputed
  renderVN: RenderFunction
}

export interface KStepPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KStepPrivateComputed {}

export type KStepProps = Merge<StepProps, ElStepProps>;

export interface KStepEmits {}

export interface KStepSlots {
  icon: () => ComponentSlotType
  title: () => ComponentSlotType
  description: () => ComponentSlotType
}

export type KStepMethods = {}