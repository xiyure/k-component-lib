import { Component } from 'vue';

export interface TransferProps {
  modelValue: Array<string | number>
  data: any[]
  filterablePlaceholder?: string
  props?: {
    label?: string
    key?: string
    disabled?: string
  }
  defaultKeys?: (string | number)[]
  filterable?: boolean
  searchStrictly?: boolean;
  drag?: boolean
  dragIcon?: string | Component
}