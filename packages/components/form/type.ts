import { ComponentInstance } from "vue";
import { CompSize } from "../../utils";

export interface FormProps {
  size?: CompSize;
  showColon?: boolean;
  showLabel?: boolean;
  hideRequiredAsterisk?: boolean
  requireAsteriskPosition?: 'left' | 'right'
  autoFocusFirst?: boolean
  autoFocusTo?: string | HTMLElement | Element | ComponentInstance<any>
}

export interface FormItemProps {
  size?: CompSize;
  label?: string;
  showLabel?: boolean;
  showColon?: boolean;
}
