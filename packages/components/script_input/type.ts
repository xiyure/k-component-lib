import { TreeConfig } from '../tree_table';

export interface ScriptInputProps {
  modelValue: string | number;
  size?: 'lg' | 'base' | 'sm' | '';
  placeholder?: string;
  disabled?: boolean;
  options?: ScriptOptions[];
  useTree?: boolean;
  showPopperSwitch?: boolean;
  showModeSwitch?: boolean;
  defaultMode?: ScriptInputMode;
  height?: string;
  onlyOneInput?: boolean | ScriptInputMode[];
  resize?: boolean;
  showPassword?: boolean;
  treeConfig?: TreeConfig;
  props?: {
    label?: string;
    value?: string;
    disabled?: string;
    optionLabel?: string;
  };
  scriptKey?: string;
  /**
   *   校验输入字符串是否合规, 单独使用时, 作用是校验变量是否合规
   */
  checkContentType?: boolean;
  /**
   *   校验输入字符串是否合规, number判断是否为数字, 包含浮点; boolean判断是否为true/false;
   */
  contentType?: 'number' | 'boolean' | 'string' | '' | 'limit';
  /**
   *   值是否可重复, 默认值为true; 改为false, 则值不可重复
   */
  optionRepeatable?: boolean;
  maxHeight?: string;
  max?: number;
  min?: number;
  tagClosable?: boolean;
}

export type ScriptOptions = {
  [key: string]: any;
};
export type ScriptInputMode = 'expression' | 'string';
