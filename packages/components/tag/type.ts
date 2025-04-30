import { CompSize } from "../../utils";

export interface TagProps {
  type?: TagType
  color?: string;
  size?: CompSize;
  point?: boolean;
  text?: string;
  textColor?: string;
  // @deprecated use effect: 'light instead
  border?: boolean;
  showOverflow?: boolean;
  effect?: TagEffect;
}

export type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export type TagEffect = 'dark' | 'light' | 'plain'
