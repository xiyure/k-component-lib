import { Component } from 'vue';

export interface StepsProps {
  processStatus?: 'wait' | 'process' | 'finish' | 'error' | 'success'
  finishStatus?: 'wait' | 'process' | 'finish' | 'error' | 'success'
  capsule?: boolean
  height?: string | number
}
export interface StepProps {
  title?: string,
  description?: string,
  icon?: string | Component
  status?: '' | 'wait' | 'process' | 'finish' | 'error' | 'success'
  color?: string
}