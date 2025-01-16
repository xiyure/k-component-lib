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
  resize?: boolean
  showPassword?: boolean
  treeConfig?: {
    [key: string]: any
  }
  props?: {
    label?: string
    value?: string
    disabled?: string
  }
  scriptKey?: string
  checkContentType?: boolean
  contentType?: 'number' | 'boolean' | 'string' | ''
  optionRepeatable?: boolean
}

export type ScriptOptions = {
  [key: string]: any
}
