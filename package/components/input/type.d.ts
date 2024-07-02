import { Component } from 'vue';
export interface InputProps {
  size?: 'lg' | 'base' | 'sm';
  iconLeft?: Component | string | undefined;
  iconRight?: Component | string | undefined;
  prefixIcon?: Component | string | undefined;
  suffixIcon?: Component | string | undefined;
}
