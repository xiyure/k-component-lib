import { VNode, Component } from 'vue';
import { LayoutDirection } from 'element-plus';

export interface DetailsProps {
  abstract?: DetailsItemProps[];
  direction?: LayoutDirection;
  showLine?: boolean;
  useflex?: boolean;
}

export interface DetailsItemProps {
  label?: string;
  value?: string | object;
  render?: () => VNode | Component;
  showLine?: boolean;
  column?: number;
  direction?: LayoutDirection;
  useflex?: boolean;
}
