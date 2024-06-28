import Color from 'element-plus/es/components/color-picker/src/utils/color';
import { Component } from 'vue';

export interface ButtonProps {
  /**
   *   继承 el-button 的颜色
   */
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | '';
    /**
   * 主要按钮
   */
  main?: boolean,
  /**
   * 次要按钮
   */
  secondary?: boolean,
  /**
   * 文字按钮
   */
  text?: boolean,
  /**
   * icon按钮
   */
  icon?: boolean,
  /**
   * 按钮尺寸，可选值为:
   */
  size?: 'base' | 'sm';
  /**
   * 文字左边图标
   */
  iconLeft?: string;
  /**
   * 文字右边图标
   */
  iconRight?: string;
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
  color?: Color | string;
}