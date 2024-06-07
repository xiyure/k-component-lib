import { Component } from 'vue';

export interface PopoverProps {
  trigger?: 'click' | 'hover'
  title?: string
  content?: string
  width?: string | number
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' |
    'bottom-end' | 'left' | 'left-start' | 'left-end '| 'right' | 'right-start' | 'right-end'
  disabled?: boolean
  visible?: boolean
  offset?: number
  transition?: string
  popperOptions?: object
  showArrow?: boolean
  popperClass?: string
  popperStyle?: object
  showAfter?: number
  hideAfter?: number
  autoClose?: number
  teleported?: boolean
  persistent?: boolean
}

export interface TooltipProps extends PopoverProps {
  type?: 'normal' | 'primary' | 'danger' | 'warning'
  color?: string
  textColor?: string
  icon?: Component
  iconSize?: string
}