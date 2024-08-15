import { Component } from 'vue';

export interface TabItemProps {
  modelValue?: string
  icon?: Component
  label?: string
  name?: string | undefined
}