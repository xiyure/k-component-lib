// SwitchButtonProps
export interface SliderButtonProps {
  items: SliderButtonPaneProps[]
  modelValue?: string | number
  defaultActive?: string | number
  // @deprecated use defaultActive instead
  active?: string | number
}

// SwitchButtonPaneProps
export interface SliderButtonPaneProps {
  label?: string
  name?: string
}
