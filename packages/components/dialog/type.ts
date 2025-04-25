import { ComponentInstance } from "vue";

export interface DialogProps {
  title?: string;
  fullscreen?: boolean;
  minHeight?: string | number;
  minWidth?: string | number;
  useResizable?: boolean;
  draggable?: boolean;
  autoFocusFirst?: boolean;
  autoFocusTo?: string | HTMLElement | Element | ComponentInstance<any>;
}