export interface ScriptInputProps {
  modelValue: string | number
  size?: 'lg' | 'base' | 'sm' | ''
  placeholder?: string
  disabled?: boolean
  options?: ScriptOptions[]
  useTree?: boolean
  showPopperSwitch?: boolean
  showModeSwitch?: boolean
  defaultMode?: 'string' | 'expression'
  height?: string
  onlyOneInput?: boolean
  treeConfig?: {
    [key: string]: any
  }
  props?: {
    label?: string
    value?: string 
    disabled?: string
  }
}

export type ScriptOptions = {
  [key: string]: any
}
