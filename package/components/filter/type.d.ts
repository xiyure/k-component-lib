export interface FilterProps {
  data?: any[],
  column?: any[]
  options?: any[]
  border?: boolean
  size?: 'base' | 'sm'
  childrenField?: string
  filterKey?: string,
  defaultCondition?: {
    conditionList?: any[]
    filterRule?: number
  }
  remote?: boolean | string[]
  formatter?: string
}