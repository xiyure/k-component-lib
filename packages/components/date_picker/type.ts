import { CompSize } from "../../utils";

export interface DatePickerProps {
  size?: CompSize,
  shortcuts?: any[],
  showDefaultShortcuts?: boolean
  type?: 'year' | 'month' | 'date' | 'datetime' | 'week' | 'datetimerange' | 'daterange'
}