import { FormItemRule } from 'element-plus';

export interface FormProps {
  model: Record<string, any>
  rules?: Record<string, any>
  inline?: boolean
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string | number
  labelSuffix?: string
  hideRequiredAsterisk?: boolean
  requireAsteriskPosition?: 'left' | 'right'
  showMessage?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  validateOnRuleChange?: boolean
  size?: '' | 'large' | 'default' | 'small'
  disabled?: boolean
  scrollToError?: boolean
  scrollIntoViewOptions?: boolean | Record<string, any>
}
type Arrayable<T> = T | T[];
export interface FormItemProps {
  props?: string | string[]
  label?: string
  labelWidth?: string | number
  required?: boolean
  rules?: Arrayable<FormItemRule>
  error?: string
  showMessage?: boolean
  inlineMessage?: string | boolean
  size?: '' | 'large' | 'default' | 'small'
  for?: string
  validateStatus?: '' | 'error' | 'validating' | 'success'
}