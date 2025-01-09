export interface OperateProps {
  data?: OperateData[]
  max?: number
  total?: number
  hideOnClick?: boolean
}

export interface OperateData {
  label?: string
  handler?: <T>(data?: T) => void
  disabled?: boolean
}