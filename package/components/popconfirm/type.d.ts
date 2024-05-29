export interface PopoverProps {
  trigger?: 'click' | 'hover'
  title?: string
  content?: string
  width?: string | number
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' |
    'bottom-end' | 'left' | 'left-start' | 'left-end '| 'right' | 'right-start' | 'right-end'
  disabled?: boolean
  visible?: boolean
  offset?: number
  transition?: string
  popperOptions?: object
  showArrow?: boolean
  popperClass?: string
  popperStyle?: object
  showAfter?: number
  hideAfter?: number
  autoClose?: number
  teleported?: boolean
  persistent?: boolean
}

export interface PopconfirmProps extends PopoverProps {
  icon?: any
  hideIcon?: boolean
  iconColor?: string
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonType?: 'main' | 'secondary' | 'normal' | 'text'
  cancelButtonType?: 'main' | 'secondary' | 'normal' | 'text'
}