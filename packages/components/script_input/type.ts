export interface ScriptInputProps {
  size?:'lg' | 'base' | 'sm' | ''
  placeholder?: string
  disabled?: boolean
  options?: ScriptOptions[]
}

export type ScriptOptions = {
  label: string
  value: string
  disabled?: boolean
  [key: string]: any
}