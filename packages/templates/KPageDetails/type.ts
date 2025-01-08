import { JSX } from 'vue/jsx-runtime';

export interface PageDetailsProps {
  pageIcon?: string,
  pageTitle?: string,
  pageDescription?: string,
  abstract?: PageAbstract[],
  showLine?: boolean,
  direction?: string,
  useflex?: boolean,
}

type PageAbstract = {
  label: string,
  value: string,
  render: () => JSX.Element,
}