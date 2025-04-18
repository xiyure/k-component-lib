import { CompSize } from "../../utils";

export interface CascaderProps {
  size?: CompSize
}

export interface CascaderConfig {
  expandTrigger?: 'click' | 'hover'
  multiple?: boolean
  emitPath?: boolean
  value?: string
  label?: string
  children?: string
  disabled?: string
  leaf?: string
  lazy?: boolean
  lazyLoad?: any
  checkStrictly?: boolean
}