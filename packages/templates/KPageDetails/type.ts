import { JSX } from 'vue/jsx-runtime';
import { Direction } from '../../utils';

export interface PageDetailsProps {
  pageIcon?: string,
  pageTitle?: string,
  pageDescription?: string,
  abstract?: PageAbstract[],
  showLine?: boolean,
  direction?: Direction
  useflex?: boolean,
}

export type PageAbstract = {
  label: string,
  value: string,
  render: () => JSX.Element,
}