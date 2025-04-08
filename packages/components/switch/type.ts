import { CSSProperties } from 'vue';
import { CompSize } from "../../utils";

export interface SwitchProps {
  activeColor?: string
  inactiveColor?: string
  size?: CompSize
  style?: CSSProperties
}