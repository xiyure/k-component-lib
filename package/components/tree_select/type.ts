import { CSSProperties } from 'vue';

export interface TreeSelectProps {
  name?: string
  icon?: string
  size?: 'base' | 'sm' | 'lg' | ''
  expandIcon?: string
  collapseIcon?: string
  debounce?: number
  className?: string | ((nodeItem: any) => string)
  nodeStyle?: CSSProperties | ((nodeItem: any) => CSSProperties)
}
