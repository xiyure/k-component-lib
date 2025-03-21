import { CompSize } from "../../utils";

export interface CheckboxGroupProps {
  size?: CompSize;
  color?: string;
}

export interface CheckboxProps {
  size?: CompSize;
  label?: string | number;
  color?: string;
  strict?: boolean;
}
