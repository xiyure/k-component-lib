export interface FilterProps {
  data?: any[],
  column?: Options[]
  options?: Options[]
  border?: boolean
  size?: 'base' | 'sm'
  childrenField?: string
  filterKey?: string,
  defaultCondition?: ConditionInfo
  remote?: boolean | string[]
  formatter?: string
  ignoreCase?: boolean
}

export type FilterValue = string | number | Date | null
export type FilterData = {
  title: string[]
  logic: 'equal' | 'notEqual' | 'gt' | 'lt' | 'gte' | 'lte' 
    | 'empty' | 'nonEmpty' | 'contains' | 'before' | 'after' | ''
  value: FilterValue
  showValue: FilterValue
  key: string | null
  dateRange?: string
  dateType?: string
  handler: ((a: FilterValue, b: FilterValue, ignoreCase?: boolean) => boolean) | null
  _allowSelectLogic?: boolean
}

export interface Options {
  title: string
  value: string
  dataType?: 'string' | 'number' | 'date'
  options?: {
    label: string
    value: string
  }[]
  group?: Options[]
}

export interface Condition {
  title: string
  logic: 'equal' | 'notEqual' | 'gt' | 'lt' | 'gte' | 'lte' | 'empty' | 'nonEmpty' | 'contains' | 'before' | 'after'
  value: FilterValue
  showValue: FilterValue
  key: string | null
  handler: ((a: FilterValue, b: FilterValue, ignoreCase?: boolean) => boolean) | null
}

export interface ConditionInfo {
  conditionList?: Condition[]
  filterRule?: number
}