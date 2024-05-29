export interface InputProps {
  id?: string
  name?: string
  label?: string
  modelValue: string | number
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
  prependClassName?: string
  appendClassName?: string
}