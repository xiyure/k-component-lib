import { JSX } from 'vue/jsx-runtime';
import { LayoutDirection } from 'element-plus';

export interface PageDetailsProps {
  pageIcon?: string,
  pageTitle?: string,
  pageDescription?: string,
  abstract?: PageAbstract[],
  showLine?: boolean,
  direction?: LayoutDirection
  useflex?: boolean,
}

export type PageAbstract = {
  label: string,
  value: string,
  render: () => JSX.Element,
}