import { Component } from "vue"

export interface optionItem {
  key?: any
  title?: string
  icon?: string | Component
  disabled?: boolean
  children?: optionItem[]
}
export interface menuViewProps {
  options?: optionItem[]
  active?: number
}

export interface subMenuProps {
  options: optionItem[]
  index: any
  disabled?: boolean
  title?: string
}