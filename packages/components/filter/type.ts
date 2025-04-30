import { DateType, CompSize } from '../../utils';

export interface FilterProps {
  data?: any[];
  options?: FilterOption[];
  border?: boolean;
  size?: CompSize;
  childrenField?: string;
  filterKey?: string;
  defaultCondition?: ConditionInfo;
  remote?: boolean | string[];
  dateFormat?: string;
  ignoreCase?: boolean;
  maxNumber?: number;
  simpleDateDisplay?: boolean;
}

export type FilterValue = string | number | Date | null | Array<string | number | Date>;
export type FilterData = {
  title: string[];
  logic: FilterLogic;
  value: FilterValue;
  showValue: FilterValue;
  key: string | null;
  dateRange?: string;
  dateType?: DateType;
  handler: ((a: FilterValue, b?: FilterValue, ignoreCase?: boolean) => boolean) | null;
  _allowSelectLogic?: boolean;
  isMultiple?: boolean;
  multipleValue?: string[];
};

export interface FilterOption {
  title: string;
  value?: string | number | boolean;
  multiple?: boolean | FilterMultipleUiType;
  dataType?: FilterDataType;
  options?: {
    label: string;
    value: string | number | boolean;
  }[];
  format?: string
  valueFormat?: string
  group?: FilterOption[];
  [key: string]: any;
}

export interface Condition {
  title: string;
  logic: FilterLogic;
  value: FilterValue;
  showValue: FilterValue;
  key: string | null;
  handler: ((a: FilterValue, b?: FilterValue, ignoreCase?: boolean) => boolean) | null;
}

export interface ConditionInfo {
  conditionList?: (Condition & { config?: any })[];
  filterRule?: number;
}

export type FilterLogic = 'equal' | 'notEqual' | 'gt' | 'lt' | 'gte' | 'lte' | 'empty' | 'nonEmpty' | 'contains' | 'before' | 'after' | '';
export type FilterDataType = 'string' | 'number' | 'date';
export type FilterMultipleUiType = 'select' | 'tree-select';
