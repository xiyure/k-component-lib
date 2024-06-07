import { Component } from 'vue';

export interface DialogProps {
  modelValue: boolean
  title?: string
  width?: string
  fullscreen?: boolean
  top?: string
  modal?: boolean
  modalClass?: string
  appendToBody?: boolean
  appendTo?: string
  lockScroll?: boolean
  openDelay?: number
  closeDelay?: number
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  beforeClose?: () => boolean
  draggable?: boolean
  overflow?: boolean
  center?: boolean
  alignCenter?: boolean
  destroyOnClose?: boolean
  closeIcon?: Component
  zIndex?: number
}