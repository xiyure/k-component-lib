export interface TabsProps {
  modelValue?: string | number;
  tabPosition?: 'top' | 'right' | 'bottom' | 'left';
  maxWidth?: string;
  addable?: boolean;
  editable?: boolean;
  showHideList?: boolean
}

export interface TabPaneProps {
  closable?: boolean
  label?: string
}

export interface TabData {
  name: string;
  label?: string | (() => string);
  disabled?: boolean;
}
