export interface SwitchProps {
  modelValue: boolean
  switchOnColor?: string
  switchOffColor?: string
  activeText?: string
  inactiveText?: string
  disabled?: boolean
  width?: string
  loading?: boolean
  size?:'lg' | 'base' | 'sm' | ''
}