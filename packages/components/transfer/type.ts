export interface TransferProps {
  modelValue: Array<any>
  data: any[]
  filterablePlaceholder?: string
  props?: {
    label?: string
    key?: string
    disabled?: string
  }
  matchKey?: string
  defaultKeys?: (string | number)[]
  filterable?: boolean
}