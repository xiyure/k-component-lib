import { Component, CSSProperties } from 'vue';
import { CompSize } from "../../utils";

export interface InputProps {
  modelValue?: string | number
  /**
   * 尺寸
   */
  size?: CompSize;
  /**
   * 输入框左边图标
   * 输入框左边图标 === prefixIcon, 需要传入组件
   */
  iconLeft?: Component | string | undefined;
  /**
   * 输入框右边图标
   * 输入框右边图标 === suffixIcon, 需要传入组件
   */
  iconRight?: Component | string | undefined;
  /**
   * el属性,左边图标
   */
  prefixIcon?: Component | string | undefined;
  /**
   * el属性,右边图标
   */
  suffixIcon?: Component | string | undefined;

  showPassword?: boolean;

  type?: string;
  selectable?: boolean;
  options?: (string | number)[];
  popperClass?: string;
  popperStyle?: CSSProperties;
  teleported?: boolean;
}
