export interface DatePicker {
  modelValue: Date | string | Array<any>
  type?: string
  format?: string
  valueFormat?: string
  rangeSeparator?: string
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  size?: 'lg' | 'base' | 'sm' | ''
  width?: string
  popperClass?: string
  readonly?: boolean
  editable?: boolean
  disabledDate?: any
  defaultValue?: Date | Array<Date>
  defaultTime?: Date | Array<Date>
  prefixIcon?: any
  teleported?: boolean
}