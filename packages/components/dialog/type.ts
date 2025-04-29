import { ComponentInstance } from "vue";

export interface DialogProps {
  modelValue?: boolean;
  title?: string;
  fullscreen?: boolean;
  minHeight?: string | number;
  minWidth?: string | number;
  // @deprecated please use `resizable` instead
  useResizable?: boolean;
  draggable?: boolean;
  autoFocusFirst?: boolean;
  autoFocusTo?: string | HTMLElement | Element | ComponentInstance<any>;
  resizable?: boolean;
  showResizeHandles?: boolean;
}