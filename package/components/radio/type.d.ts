export interface SelectButtonGroupProps {
  modelValue?: any
  disabled?: boolean
  size?: 'lg' | 'base' | 'sm' | ''
  color?: string
  name?: string,
  id?: string | number
  direction?: 'row' | 'column'
}

export interface SelectButtonProps {
  modelValue?: string | number | boolean
  value?: string | number | boolean
  checked?: boolean
  disabled?: boolean
  size?: 'lg' | 'base' | 'sm' | ''
  label?: string | number
  indeterminate?: boolean
  color?: string
  name?: string
  id?: string | number
}