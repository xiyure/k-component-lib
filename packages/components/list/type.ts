export interface ListProps {
  loading?: boolean
  error?: boolean
  finished?: boolean
  offset?: number
  loadingText?: string
  errorText?: string
  finishedText?: string
  disabled?: boolean
  scroller?: Element
  immediate?: boolean
}
