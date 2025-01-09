import { VNode, Component } from 'vue';

export interface FilterFormItem {
  label?: string;
  prop: string;
  value: any;
  type: 'input' | 'select' | 'date' | 'checkbox' | 'radio' | 'cascader' | 'tree-select';
  attrs?: any;
  render?: (item: any) => VNode | Component;
  options?: any[];
  column?: number;
  visible?: boolean | ((item: any) => boolean);
}

export interface FilterFormProps {
  items?: FilterFormItem[];
  size?: 'base' | 'sm' | undefined;
  collapse?: boolean;
  reserve?: boolean;
  visible?: boolean;
  showColon?: boolean;
}
