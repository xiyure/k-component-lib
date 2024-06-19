import { Component } from "vue";

export interface ButtonProps {
  /**
   *   按钮状态: 普通按钮, 主要按钮, 次级按钮, 文字按钮, 图标按钮.
   *   可选值为:
   */
  type?: "normal" | "main" | "secondary" | "text" | "icon";
  /**
   * 按钮尺寸，可选值为:
   */
  size?: "base" | "sm";
  /**
   * 文字左边图标
   */
  iconLeft?: Component;
  /**
   * 文字右边图标
   */
  iconRight?: Component;
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
}
