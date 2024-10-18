export interface RadioProps {
  /**
   * 尺寸, 默认 base
   */
  size?: 'base' | 'sm';
  /**
   * 自定义颜色
   */
  color?: string;
  /**
   * 是否为按钮样式, 建议配合 KRadioGroup 使用
   */
  button?: boolean;
}
export interface RadioGroupProps {
  /**
   * 尺寸
   */
  size?: 'base' | 'sm';
  /**
   * 排列方向
   */
  direction?: 'row' | 'column';
  /**
   * button 样式的 radio
   */
  button?: boolean;
  color?: string;
  column?: boolean;
  row?: boolean;
}
