import { VNode, Component } from 'vue';
import { Direction } from '../../utils';

export interface DetailsProps {
  abstract?: DetailsItemProps[];
  direction?: Direction;
  showLine?: boolean;
  useflex?: boolean;
}

export interface DetailsItemProps {
  label?: string;
  value?: string | object;
  render?: () => VNode | Component;
  showLine?: boolean;
  column?: number;
  direction?: Direction;
  useflex?: boolean;
}
