import { Component } from 'vue';
import { PopperTrigger, Placement, CompSize } from '../../utils';

export interface ButtonContainerProps {
  trigger?: PopperTrigger
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
