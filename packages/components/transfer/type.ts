import { Component } from "vue"

export interface TransferProps {
  modelValue: Array<string | number>
  data: any[]
  filterablePlaceholder?: string
  props?: {
    label?: string
    key?: string
    disabled?: string
  }
  matchKey?: string
  defaultKeys?: (string | number)[]
  filterable?: boolean
  drag?: boolean
  dragIcon?: string | Component
}