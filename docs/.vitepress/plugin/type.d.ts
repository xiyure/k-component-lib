// Demo参数类型定义
export type DemoProps = {
  path: string
  code: string
  title?: string
  desc?: string
}

// 组件参数类型定义
export type componentProps = {
  src?: string
  title?: string
  desc?: string
  type?: string
  lang?: string
}

interface BaseProps {
  displayName: string
  description?: string
  tip?: string
  tags?: any
}

// 组件参数类型定义
export interface Props extends BaseProps {
  type: string
  defaultValue?: string
  required?: boolean
  tags?: any
}

// 组件事件类型定义
export interface Events extends BaseProps {
  type: string
}

// 组件方法类型定义
export interface Methods extends BaseProps {
  type: string
}

// 组件插槽类型定义
export interface Slots extends BaseProps {
  parameters: string
}