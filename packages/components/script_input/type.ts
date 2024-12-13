export interface ScriptInputProps {
  modelValue: string | number
  size?: 'lg' | 'base' | 'sm' | ''
  placeholder?: string
  disabled?: boolean
  options?: ScriptOptions[]
  useTree?: boolean
  showPopperSwitch?: boolean
  showModeSwitch?: boolean
  treeConfig?: {
    [key: string]: any
  }
}

export type ScriptOptions = {
  label: string
  value: string
  disabled?: boolean
  [key: string]: any
}
