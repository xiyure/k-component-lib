import { Component, CSSProperties } from 'vue';
import { LayoutDirection } from 'element-plus'

export interface SplitProps {
  modelValue?: number | string
  defaultSize?: number | string
  component?: string
  direction?: LayoutDirection
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