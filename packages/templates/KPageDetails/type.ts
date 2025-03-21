import { JSX } from 'vue/jsx-runtime';

export interface PageDetailsProps {
  pageIcon?: string,
  pageTitle?: string,
  pageDescription?: string,
  abstract?: PageAbstract[],
  showLine?: boolean,
  direction?: 'horizontal' |'vertical' | undefined,
  useflex?: boolean,
}

export type PageAbstract = {
  label: string,
  value: string,
  render: () => JSX.Element,
}