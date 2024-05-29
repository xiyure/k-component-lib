type AllowedButtons = 'previous' | 'next' | 'close'
export interface TourProps {
  modelValue: boolean
  steps?: any[]
  allowClose?: boolean
  allowKeyboardControl?: boolean
  animate?: boolean
  overlayOpacity?: number
  overlayColor?: string
  stagePadding?: number
  stageRadius?: number
  disableActiveInteraction?: boolean
  popoverClass?: string
  offset?: number
  showButtons?: AllowedButtons[]
  disableButtons?: AllowedButtons[]
  showProgress?: boolean
  progressText?: string
  nextBtnText?: string
  prevBtnText?: string
  doneBtnText?: string
}