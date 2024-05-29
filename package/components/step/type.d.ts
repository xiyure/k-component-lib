import { Component } from 'vue'

export interface StepsProps {
  space?: number | string
  direction?: 'vertical' | 'horizontal'
  active?: number
  processStatus?: 'wait' | 'process' | 'finish' | 'error' | 'success'
  finishStatus?: 'wait' | 'process' | 'finish' | 'error' | 'success'
  alignCenter?: boolean
  capsule?: boolean
  height?: string | number
}
export interface StepProps {
  title?: string,
  description?: string,
  icon?: string | Component
  status?: '' | 'wait' | 'process' | 'finish' | 'error' | 'success'
  width?: string | number
  color?: string
}