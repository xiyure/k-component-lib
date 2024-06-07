import { Component } from 'vue';

export interface MessageProps {
  message?: string | (() => string)
  type?: 'success' | 'info' | 'warning' | 'error'
  plain?: boolean
  icon?: string | Component
  dangerouslyUseHTMLString?: boolean
  customClass?: string
  duration?: number
  showClose?: boolean
  center?: boolean
  offset?: number
  onClose?: () => void
  grouping?: boolean
  appendTo?: string | HTMLElement
  repeatNum?: number
}