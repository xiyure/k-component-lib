import { Component } from "vue"

export interface TimelineProps {
  showLine?: boolean
}
export interface TimelineItemProps {
  timestamp?: string
  hideTimestamp?: boolean
  center?: boolean
  placement?: 'top' | 'bottom' | 'right'
  type?: 'primary' | 'success' | 'error' | 'wait'
  color?: string
  icon?: string | Component
  hollow?: boolean
  size?: 'large' | 'normal'
}