export interface TagProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | string;
  color?: string;
  size?: 'lg' | 'base' | 'sm' | '';
  textColor?: string;
  point?: boolean;
  text?: string;
  border?: boolean;
}
