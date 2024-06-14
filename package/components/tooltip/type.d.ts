import { Component } from 'vue';

export interface TooltipProps {
  type?: 'normal' | 'primary' | 'danger' | 'warning'
  color?: string
  textColor?: string
  icon?: Component
  iconSize?: string
}