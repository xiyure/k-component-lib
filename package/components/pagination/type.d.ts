import { Component } from "vue"
export interface PaginationProps {
  total: number
  pageSize?: number
  pageSizes?: object
  disabled?: boolean
  size?: string
  background?: boolean
  layout?: string
  small?: boolean
  pagerCount?: number
  currentPage?: number
  defaultCurrentPage?: number
  popperClass?: string
  prevText?: string
  prevIcon?: Component
  nextText?: string
  nextIcon?: Component
  teleported?: boolean
  hideOnSinglePage?: boolean
}