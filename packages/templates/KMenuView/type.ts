import { Component } from 'vue';

export interface menuViewOption {
  index?: any
  title?: string
  icon?: string | Component
  disabled?: boolean
  route?: object
  children?: menuViewOption[]
  [key: string]: any
}
export interface menuViewProps {
  options?: menuViewOption[]
  defaultActive?: string
  showCollapse?: boolean
  collapse?: boolean
}

export interface subMenuViewProps {
  options: menuViewOption[]
}