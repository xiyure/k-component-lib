import { CSSProperties } from "vue"

export interface InputProps {
  id?: string
  name?: string
  autocomplete?: string
  inputStyle?: CSSProperties | CSSProperties[]
  validateEvent?: boolean
  max?: any
  min?: any
  step?: any
  label?: string
  modelValue?: string | number
  type?: string
  width?: string
  prefixIcon?: any
  suffixIcon?: any
  disabled?: boolean
  placeholder?: string
  size?: 'lg' | 'base' | 'sm' | ''
  clearable?: boolean
  readonly?: boolean
  showWordLimit?: boolean
  autosize?: boolean | object
  showPassword?: boolean
  rows?: number
  maxlength?: string | number
  minlength?: string | number
}