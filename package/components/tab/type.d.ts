import { Component } from 'vue';

export interface TabItemProps {
  modelValue?: string
  path?: string
  icon?: Component
  label?: string
  name?: string | undefined
}