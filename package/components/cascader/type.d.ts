export interface CascaderProps {
  modelValue: any
  options?: object
  props?: object
  showAllLevels?: boolean
  separator?: string
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  filterable?: boolean
  size?: 'lg' | 'base' | 'sm' | ''
  width?: string
  popperClass?: string
  collapseTags?: boolean
  beforeFilter?: any
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