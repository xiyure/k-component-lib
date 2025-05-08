import { Component } from 'vue';

export interface StepsProps {
  processStatus?: StepStatus;
  finishStatus?: StepStatus;
  capsule?: boolean;
  height?: string | number;
  active?: number;
  useAntStyle?: boolean;
}
export interface StepProps {
  title?: string;
  description?: string;
  icon?: string | Component;
  status?: StepStatus;
  color?: string;
  textColor?: string;
}

export type StepStatus = '' | 'wait' | 'process' | 'finish' | 'error' |'success';
