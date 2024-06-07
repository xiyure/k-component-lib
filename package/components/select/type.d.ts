import { Component } from 'vue';

export interface SelectInputProps {
  modelValue: any
  multiple?: boolean
  disabled?: boolean
  valueKey?: string
  clearable?: boolean
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  multipleLimit?: number
  autocomplete?: string
  placeholder?: string
  filterable?: boolean
  filterMethod?: () => void
  remote?: boolean
  remoteMethod?: () => void
  remoteShowSuffix?: boolean
  loading?: boolean
  loadingText?: string
  noMatchText?: string
  noDataText?: string
  allowCreate?: boolean
  size?: 'lg' | 'base' | 'sm' | ''
  width?: string
  popperClass?: string
  teleported?: boolean
  defaultFirstOption?: boolean
  fitInputWidth?: boolean
  suffixIcon?: string | Component
  name?: string
  automaticDropdown?: boolean
  persistent?: boolean
}

// Select Option
export interface OptionProps {
  value: any
  label: string
  disabled?: boolean
}