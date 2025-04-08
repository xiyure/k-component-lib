import { CSSProperties } from 'vue';
import { CompSize } from "../../utils";

export interface TreeSelectProps {
  name?: string
  icon?: string
  size?: CompSize
  expandIcon?: string
  collapseIcon?: string
  debounce?: number
  className?: string | ((nodeItem: any) => string)
  nodeStyle?: CSSProperties | ((nodeItem: any) => CSSProperties)
}
