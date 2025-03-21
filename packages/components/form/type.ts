import { CompSize } from "../../utils";

export interface FormProps {
  size?: CompSize;
  showColon?: boolean;
  showLabel?: boolean;
}

export interface FormItemProps {
  size?: CompSize;
  label?: string;
  showLabel?: boolean;
}
