import { CSSProperties } from 'vue';

export interface TooltipProps {
  type?: TooltipType
  color?: string
  textColor?: string
  popperStyle?: CSSProperties
}

export type TooltipType = 'normal' | 'primary' | 'danger' | 'warning'