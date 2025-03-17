export interface TagProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | string;
  color?: string;
  size?: 'lg' | 'base' | 'sm' | '';
  point?: boolean;
  text?: string;
  border?: boolean;
  showOverflow?: boolean;
}
