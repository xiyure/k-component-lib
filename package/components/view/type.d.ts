export interface ViewProps {
  modelValue: string
}
export interface ViewItemProps {
  value: any,
  label?: string
  count?: number | string
  disabled?: boolean,
  isCustom?: boolean
}