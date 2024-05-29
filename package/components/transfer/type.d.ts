export interface TransferProps {
  modelValue: Array<object>
  data: Array<object>
  filterable?: boolean
  filterablePlaceholder?: string
  targetOrder?: 'original' | 'push' | 'unshift'
  titles?: Array<string>
  buttonTexts?: Array<string>
  renderContent?: object
  format?: object
  props?: object
  leftDefaultChecked?: Array<string | number>
  rightDefaultChecked?: Array<string | number>
  filterMethod?: any
  matchKey?: string
  defaultKeys?: Array<string>
}