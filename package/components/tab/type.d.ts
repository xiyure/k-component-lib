import { Component } from 'vue';

export interface TabItemProps {
  path?: string
  icon?: Component
  label?: string
  name?: string
}