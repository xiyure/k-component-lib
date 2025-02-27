import { Component, CSSProperties } from 'vue';

export interface SplitProps {
  modelValue: number | string
  component?: string
  direction?: 'horizontal' | 'vertical'
  min?: number | string | undefined
  max?: number | string | undefined
  disabled?: boolean
  pane1Class?: string
  pane1Style?: CSSProperties
  pane2Class?: string
  pane2Style?: CSSProperties
  triggerIcon?: string | Component
  showTrigger?: boolean
}