export interface TabsProps {
  modelValue?: string | number;
  tabPosition?: 'top' | 'right' | 'bottom' | 'left';
  maxWidth?: string;
  showHideList?: boolean
}

export interface TabData {
  name: string;
  label?: string | (() => string);
  disabled?: boolean;
}
