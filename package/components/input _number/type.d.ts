export interface InputNumberProps {
  id?: string
  name?: string
  label?: string
  modelValue: number | null
  width?: string
  disabled?: boolean
  placeholder?: string
  size?: 'lg' | 'base' | 'sm' | ''
  readonly?: boolean
  min?: number
  max?: number
  step?: number
  stepStrictly?: boolean
  precision?: number
  controls?: boolean
  controlsPosition?: string
}