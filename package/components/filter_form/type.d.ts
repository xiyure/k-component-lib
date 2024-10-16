import { VNode } from "vue";
import type { FormItemProps } from 'element-plus';

interface filterFormItem {
  label?: string
  prop: string
  value: any
  type: 'input' | 'select' | 'date' | 'checkbox' | 'radio' | 'cascader' | 'tree-select'
  attrs?: any
  render?: (item: any) => VNode | Comment
  options?: any[]
}

export interface FilterFormProps {
  items?: filterFormItem[]
  size?: 'base' | 'sm' | undefined
}