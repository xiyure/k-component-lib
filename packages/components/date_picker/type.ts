export interface DatePicker {
  size?: 'lg' | 'base' | 'sm' | ''
  shortcuts?: any[],
  showDefaultShortcuts?: boolean
  type?: 'year' | 'month' | 'date' | 'datetime' | 'week' | 'datetimerange' | 'daterange'
}