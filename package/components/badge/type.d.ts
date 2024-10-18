export interface BadgeProps {
  value?: string | number
  max?: number,
  isDot?: boolean
  hidden?: boolean
  color?: string
  showZero?: boolean
  offset?: [number, number]
  badgeStyle?: object
  badgeClass?: string
}