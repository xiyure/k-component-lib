import { Component, VNode } from 'vue';

export interface DetailsItemProps {
  label?: string;
  value?: string | object;
  render?: () => Component | VNode;
  line?: boolean;
}
