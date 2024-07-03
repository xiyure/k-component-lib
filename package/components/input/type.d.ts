import { Component } from 'vue';
export interface InputProps {
  /**
   * 尺寸
   */
  size?: 'base' | 'sm';
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
}

export interface InputGroupProps {
  size?: 'base' | 'sm';
}
