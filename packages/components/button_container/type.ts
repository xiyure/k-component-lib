import { Component } from 'vue';
import { DropdownTrigger } from '../dropdown/type'
import { Placement, CompSize } from '../../utils';

export interface ButtonContainerProps {
  trigger?: DropdownTrigger
  maxHeight?: string | number
  placement?: Placement
  hideOnClick?: boolean
  showTimeout?: number
  hideTimeout?: number
  popperClass?: string
  teleported?: boolean
  triggerIcon?: string | Component
  size?: CompSize
}

export type ButtonContainerTab = {
  label: string | (() => string)
  disabled: boolean,
  index: number
}
