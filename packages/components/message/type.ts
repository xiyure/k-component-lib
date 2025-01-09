import { Component, VNode } from 'vue';

export interface MessageProps {
  message?: VNode | string | (() => string)
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

export type MessageOption = MessageProps | string;
export type Message = 'success' | 'warning' | 'info' | 'error';
export interface MessageService<T, V> {
  (options:T): V,
  success: (options:T) => V,
  error: (options:T) => V,
  warning: (options:T) => V,
  info: (options:T) => V,
}