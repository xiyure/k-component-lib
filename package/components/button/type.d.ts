import { Component } from 'vue';

export interface ButtonProps {
  type?: 'normal' | 'main' | 'secondary' | 'text' | 'icon';
  size?: 'lg' | 'base' | 'sm' | '';
  status?: string;
  iconRight?: any;
  iconLeft?: any;
  value?: string;
  disabled?: boolean;
  loading?: boolean;
  loadingIcon?: Component;
}
