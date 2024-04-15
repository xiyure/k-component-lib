// Button
export interface IButtonProps {
  type?: string,
  size?: string,
  status?: string,
  iconRight?: any,
  iconLeft?: any,
  value?: string,
  disabled?: boolean,
  loading?: boolean,
  loadingIcon?: object
}

// Tab
export interface ITabItem {
  label?: string,
  name: string,
  path?: string,
  closable?: boolean,
  disabled?: boolean,
  icon?: any
}

// Input
export interface IInput {
  id?: string,
  name?: string,
  label?: string,
  modelValue: string | number,
  type?: string,
  width?: string,
  prefixIcon?: any,
  suffixIcon?: any,
  disabled?: boolean,
  placeholder?: string,
  size?: string,
  clearable?: boolean,
  readonly?: boolean,
  showWordLimit?: boolean,
  autosize?: boolean | object,
  showPassword?: boolean,
  rows?: number,
  maxlength?: string | number,
  minlength?: string | number,
  prependClassName?: string,
  appendClassName?: string
}

// InputNumber
export interface IInputNumber {
  id?: string,
  name?: string,
  label?: string,
  modelValue: number | null,
  width?: string,
  disabled?: boolean,
  placeholder?: string,
  size?: string,
  readonly?: boolean,
  min?: number,
  max?: number,
  step?: number,
  stepStrictly?: boolean,
  precision?: number,
  controls?: boolean,
  controlsPosition?: string
}

// Pagination
export interface IPaginationProps {
  total: number,
  pageSize?: number,
  pageSizes?: object,
  disabled?: boolean,
  size?: string,
  background?: boolean,
  layout?: string
}

export interface ISelectInput {}
