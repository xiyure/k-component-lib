export interface TimelineProps {
  showLine?: boolean
}
export interface TimelineItemProps {
  placement?: TimelinePlacement
  type?: TimelineType
  color?: string
  hollow?: boolean
}

export type TimelinePlacement = 'top' | 'bottom' | 'right'
export type TimelineType = 'primary' |'success' | 'error' | 'wait'