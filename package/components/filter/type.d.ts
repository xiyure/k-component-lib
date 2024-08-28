export interface FilterProps {
  modelValue?: any
  data?: any,
  column?: any[]
  border?: boolean
  size?: 'base' | 'sm'
  childrenField?: string
  filterKey?: string,
  defaultCondition?: {
    conditionList?: any[]
    filterRule?: number
  }
}