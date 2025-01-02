import { CSSProperties } from "vue"

export interface SwitchProps {
  activeColor?: string
  inactiveColor?: string
  size?:'lg' | 'base' | 'sm' | ''
  style?: CSSProperties
}