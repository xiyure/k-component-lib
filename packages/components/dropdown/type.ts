import { CompSize } from "../../utils";

export interface DropdownProps {
  title?: string
  size?: CompSize
}

export type DropdownTrigger = 'hover' | 'click' | 'contextmenu'