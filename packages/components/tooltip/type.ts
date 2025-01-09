import { CSSProperties } from 'vue';

export interface TooltipProps {
  type?: 'normal' | 'primary' | 'danger' | 'warning'
  color?: string
  textColor?: string
  popperStyle?: CSSProperties
}