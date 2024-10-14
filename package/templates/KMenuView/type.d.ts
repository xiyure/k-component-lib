import { Component } from "vue"

export interface optionItem {
  index?: any
  title?: string
  icon?: string | Component
  disabled?: boolean
  route?: object
  children?: optionItem[]
}
export interface menuViewProps {
  options?: optionItem[]
  active?: number
}

export interface subMenuProps {
  options: optionItem[]
}