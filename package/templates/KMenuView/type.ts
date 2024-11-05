import { Component } from 'vue';

export interface menuViewOption {
  index?: any
  title?: string
  icon?: string | Component
  disabled?: boolean
  route?: object
  children?: menuViewOption[]
}
export interface menuViewProps {
  options?: menuViewOption[]
  active?: number
  showCollapse?: boolean
  collapse?: boolean
}

export interface subMenuViewProps {
  options: menuViewOption[]
}