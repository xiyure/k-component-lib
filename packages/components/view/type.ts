export interface ViewProps {
  defaultActive?: string | number
  data?: ViewData[]
  draggable?: boolean
  collapse?: boolean
}
export interface ViewData {
  value: any
  label?: string
  count?: number | string
  disabled?: boolean
  custom?: boolean
  showCustomControl?: boolean
}
