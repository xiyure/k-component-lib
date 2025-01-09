export interface TabsProps {
  modelValue?: string | number;
  tabPosition?: 'top' | 'right' | 'bottom' | 'left';
  editable?: boolean;
  addable?: boolean;
  maxWidth?: string;
  type?: '' | 'card' | 'folder';
}

export interface TabData {
  name: string;
  label?: string | (() => string);
  disabled?: boolean;
}
