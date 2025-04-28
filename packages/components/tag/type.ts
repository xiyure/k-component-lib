import { CompSize } from "../../utils";

export interface TagProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | string;
  color?: string;
  size?: CompSize;
  point?: boolean;
  text?: string;
  textColor?: string;
  // @deprecated use effect: 'light instead
  border?: boolean;
  showOverflow?: boolean;
  effect?: 'dark' | 'light' | 'plain';
}
