export interface DrawerProps {
  modelValue: boolean
  appendToBody?: boolean
  lockScroll?: boolean
  openDelay?: number
  closeDelay?: number
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  destroyOnClose?: boolean
  modal?: boolean
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
  size?: number | string
  title?: string
  withHeader?: boolean
  modalClass?: string
  zIndex?: number
  beforeClose?: () => boolean
}