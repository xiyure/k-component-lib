export interface ScriptInputProps {
  modelValue: string | number;
  size?: 'lg' | 'base' | 'sm' | '';
  placeholder?: string;
  disabled?: boolean;
  options?: ScriptOptions[];
  useTree?: boolean;
  showPopperSwitch?: boolean;
  showModeSwitch?: boolean;
  defaultMode?: 'string' | 'expression';
  height?: string;
  onlyOneInput?: boolean;
  resize?: boolean;
  showPassword?: boolean;
  treeConfig?: {
    [key: string]: any;
  };
  props?: {
    label?: string;
    value?: string;
    disabled?: string;
  };
  scriptKey?: string;
  /**
   *   校验输入字符串是否合规, 单独使用时, 作用是校验变量是否合规
   */
  checkContentType?: boolean;
  /**
   *   校验输入字符串是否合规, number判断是否为数字, 包含浮点; boolean判断是否为true/false;
   */
  contentType?: 'number' | 'boolean' | 'string' | '';
  /**
   *   值是否可重复, 默认值为true; 改为false, 则值不可重复
   */
  optionRepeatable?: boolean;
  maxHeight?: string;
}

export type ScriptOptions = {
  [key: string]: any;
};
