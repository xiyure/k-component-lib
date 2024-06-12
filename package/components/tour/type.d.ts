import { CSSProperties, Component, VNode } from 'vue';

export interface TourProps {
  modelValue: boolean
  showArrow?: boolean
  showClose?: boolean
  placement?: 
    'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
  contentStyle?: CSSProperties
  mask?: boolean | { style?: CSSProperties, color?: string }
  type?: 'primary' | 'default'
  current?: number
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions
  zIndex?: number
  closeIcon?: Component
  closeOnPressEscape?: boolean
  targetAreaClickable?: boolean
}

export interface TourItemProps {
  target?: HTMLElement | string | (() => HTMLElement)
  showArrow?: boolean
  title?: string
  description?: string
  placement?: 
    'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
  contentStyle?: CSSProperties
  mask?: boolean | { style?: CSSProperties, color?: string }
  type?: 'primary' | 'default'
  showClose?: boolean
  closeIcon?: Component
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions
  nextButtonProps?: { children: VNode | string, onClick: (e: any) => any }
  prevButtonProps?: { children: VNode | string, onClick: (e: any) => any }
}