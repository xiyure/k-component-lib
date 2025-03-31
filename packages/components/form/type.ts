import { CompSize } from "../../utils";

export interface FormProps {
  size?: CompSize;
  showColon?: boolean;
  showLabel?: boolean;
  hideRequiredAsterisk?: boolean
  requireAsteriskPosition?: 'left' | 'right'
}

export interface FormItemProps {
  size?: CompSize;
  label?: string;
  showLabel?: boolean;
  showColon?: boolean;
}
