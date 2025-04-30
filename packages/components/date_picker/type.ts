import { DateType, CompSize } from "../../utils";

export interface DatePickerProps {
  size?: CompSize,
  shortcuts?: any[],
  showDefaultShortcuts?: boolean
  type?: DateType
}