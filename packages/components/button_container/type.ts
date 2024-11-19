import { Component } from 'vue';

export interface ButtonContainerProps {
  trigger?: 'hover' | 'click' | 'contextMenu'
  maxHeight?: string | number
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
  hideOnClick?: boolean
  showTimeout?: number
  hideTimeout?: number
  popperClass?: string
  teleported?: boolean
  triggerIcon?: string | Component
}
