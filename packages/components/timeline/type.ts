export interface TimelineProps {
  showLine?: boolean
}
export interface TimelineItemProps {
  placement?: 'top' | 'bottom' | 'right'
  type?: 'primary' | 'success' | 'error' | 'wait'
  color?: string
  hollow?: boolean
}