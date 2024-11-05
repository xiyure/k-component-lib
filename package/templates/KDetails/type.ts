import { VNode, Component } from 'vue';

export interface DetailsItemProps {
  label?: string;
  value?: string | object;
  render?: () => VNode | Component;
  showLine?: boolean;
  column?: number;
  direction?: 'horizontal' | 'vertical';
}

export interface DetailsProps {
  abstract?: DetailsItemProps[];
  direction?: 'horizontal' | 'vertical';
  showLine?: boolean;
}
