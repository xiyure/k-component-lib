import { CompSize } from '../../utils';

export interface FilterProps {
  data?: any[];
  options?: FilterOptions[];
  border?: boolean;
  size?: CompSize;
  childrenField?: string;
  filterKey?: string;
  defaultCondition?: ConditionInfo;
  remote?: boolean | string[];
  formatter?: string;
  ignoreCase?: boolean;
  maxNumber?: number;
  searchMethod?: (data: ConditionInfo | undefined) => any[];
}

export type FilterValue = string | number | Date | null | Array<string | number | Date>;
export type FilterData = {
  title: string[];
  logic:
    | 'equal'
    | 'notEqual'
    | 'gt'
    | 'lt'
    | 'gte'
    | 'lte'
    | 'empty'
    | 'nonEmpty'
    | 'contains'
    | 'before'
    | 'after'
    | '';
  value: FilterValue;
  showValue: FilterValue;
  key: string | null;
  dateRange?: string;
  dateType?:
    | 'year'
    | 'month'
    | 'week'
    | 'date'
    | 'datetime'
    | 'datetimerange'
    | 'daterange'
    | undefined;
  handler: ((a: FilterValue, b?: FilterValue, ignoreCase?: boolean) => boolean) | null;
  _allowSelectLogic?: boolean;
  isMultiple?: boolean;
  multipleValue?: string[];
};

export interface FilterOptions {
  title: string;
  value?: string | number | boolean;
  multiple?: boolean;
  dataType?: 'string' | 'number' | 'date';
  options?: {
    label: string;
    value: string | number | boolean;
  }[];
  group?: FilterOptions[];
  [key: string]: any;
}

export interface Condition {
  title: string;
  logic:
    | 'equal'
    | 'notEqual'
    | 'gt'
    | 'lt'
    | 'gte'
    | 'lte'
    | 'empty'
    | 'nonEmpty'
    | 'contains'
    | 'before'
    | 'after';
  value: FilterValue;
  showValue: FilterValue;
  key: string | null;
  handler: ((a: FilterValue, b?: FilterValue, ignoreCase?: boolean) => boolean) | null;
}

export interface ConditionInfo {
  conditionList?: Condition[];
  filterRule?: number;
}
