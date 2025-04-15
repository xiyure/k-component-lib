import { CompSize } from "../../utils";

export interface TagProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | string;
  color?: string;
  size?: CompSize;
  point?: boolean;
  text?: string;
  textColor?: string;
  border?: boolean;
  showOverflow?: boolean;
}
