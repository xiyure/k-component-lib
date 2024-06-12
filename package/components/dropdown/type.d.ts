import { Component } from 'vue';

export interface DropDownProps {
  title?: string
  type?: 'primary'| 'success'| 'warning'| 'danger'| 'info'| 'text'
  maxHeight?: string | number
  splitButton?: boolean
  disabled?: boolean
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom'| 'bottom-start' | 'bottom-end'
  trigger?: 'hover' | 'click' | 'contextmenu'
  size?:'lg' | 'base' | 'sm' | ''
  hideOnClick?: boolean
  showTimeout?: number
  hideTimeout?: number
  role?: string
  teleported?: boolean
  popperClass?: string
  popperOptions?: object
}

export interface DropDownItemProps {
  command?: string | number
  disabled?: boolean
  divided?: boolean
  icon?: Component
}