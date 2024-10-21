export interface ViewProps {
  defaultActive?: string | number
  data?: any[]
  draggable?: boolean
}
export interface ViewItemProps {
  value: any,
  label?: string
  count?: number | string
  disabled?: boolean,
  custom?: boolean
}