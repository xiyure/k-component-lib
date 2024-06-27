import { Component } from 'vue';

export interface ButtonProps {
  /**
   *   按钮状态: 普通按钮, 主要按钮, 次级按钮, 文字按钮, 图标按钮.
   *   可选值为:
   */
  
  type?: 'primary'|'success' | 'info' | 'warning' | 'danger' | string ;
  /**
   * 按钮尺寸，可选值为:
   */
  size?: 'base' | 'sm';
  /**
   * 文字左边图标
   */
  iconLeft?: Component | null;
  /**
   * 文字右边图标
   */
  iconRight?: Component | null;
  /**
   * 按钮内容
   */
  value?: string;
  /**
   * 禁止点击
   */
  disabled?: boolean;
  /**
   * 按钮加载
   */
  loading?: boolean;
  /**
   * 加载图标
   */
  loadingIcon?: Component;
  /**
   *  十六进制颜色: 例如 #ff5500
   */
  color?: string;
  main?: boolean,
  secondary?: boolean,
  text?: boolean,
  icon?: boolean,
}