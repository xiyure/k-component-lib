import {
  UploadRequestOptions,
  UploadFile,
  UploadFiles,
  UploadRawFile,
  UploadUserFile,
  UploadProgressEvent,
  FormItemRule
} from 'element-plus';
import type { TreeNode, TreeKey, TreeData } from 'element-plus/es/components/tree-v2/src/types';
import { CSSProperties, Component } from 'vue';

// Button
export interface ButtonProps {
  type?: 'main' | 'secondary' | 'text' | 'normal'
  size?: 'lg' | 'base' | 'sm' | ''
  status?: string
  iconRight?: any
  iconLeft?: any
  value?: string
  disabled?: boolean
  loading?: boolean
  loadingIcon?: Component
}

// Tab
export interface TabItemProps {
  label?: string
  name: string
  path?: string
  closable?: boolean
  disabled?: boolean
  icon?: any
}

// Input
export interface InputProps {
  id?: string
  name?: string
  label?: string
  modelValue: string | number
  type?: string
  width?: string
  prefixIcon?: any
  suffixIcon?: any
  disabled?: boolean
  placeholder?: string
  size?: 'lg' | 'base' | 'sm' | ''
  clearable?: boolean
  readonly?: boolean
  showWordLimit?: boolean
  autosize?: boolean | object
  showPassword?: boolean
  rows?: number
  maxlength?: string | number
  minlength?: string | number
  prependClassName?: string
  appendClassName?: string
}

// InputNumber
export interface InputNumberProps {
  id?: string
  name?: string
  label?: string
  modelValue: number | null
  width?: string
  disabled?: boolean
  placeholder?: string
  size?: 'lg' | 'base' | 'sm' | ''
  readonly?: boolean
  min?: number
  max?: number
  step?: number
  stepStrictly?: boolean
  precision?: number
  controls?: boolean
  controlsPosition?: string
}

// Pagination
export interface PaginationProps {
  total: number
  pageSize?: number
  pageSizes?: object
  disabled?: boolean
  size?: string
  background?: boolean
  layout?: string
}

// Switch
export interface SwitchProps {
  modelValue: boolean
  switchOnColor?: string
  switchOffColor?: string
  activeText?: string
  inactiveText?: string
  disabled?: boolean
  width?: string
  loading?: boolean
  size?:'lg' | 'base' | 'sm' | ''
}

// Radio/Checkbox
export interface SelectButtonProps {
  modelValue?: string | number | boolean
  value?: string | number | boolean
  checked?: boolean
  disabled?: boolean
  size?: 'lg' | 'base' | 'sm' | ''
  label?: string | number
  indeterminate?: boolean
  color?: string
  name?: string
  id?: string | number
}

// RadioGroup/CheckboxGroup
export interface SelectButtonGroupProps {
  modelValue?: any
  disabled?: boolean
  size?: 'lg' | 'base' | 'sm' | ''
  color?: string
  name?: string,
  id?: string | number
}

// Select
export interface SelectInputProps {
  modelValue: any
  multiple?: boolean
  disabled?: boolean
  valueKey?: string
  clearable?: boolean
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  multipleLimit?: number
  autocomplete?: string
  placeholder?: string
  filterable?: boolean
  filterMethod?: () => void
  remote?: boolean
  remoteMethod?: () => void
  remoteShowSuffix?: boolean
  loading?: boolean
  loadingText?: string
  noMatchText?: string
  noDataText?: string
  allowCreate?: boolean
  size?: 'lg' | 'base' | 'sm' | ''
  width?: string
  popperClass?: string
  teleported?: boolean
  defaultFirstOption?: boolean
  fitInputWidth?: boolean
  suffixIcon?: string | Component
  name?: string
  automaticDropdown?: boolean
  persistent?: boolean
}

// Select Option
export interface OptionProps {
  value: any
  label: string
  disabled?: boolean
}

// Cascader
export interface CascaderProps {
  modelValue: any
  options?: object
  props?: object
  showAllLevels?: boolean
  separator?: string
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  filterable?: boolean
  size?: 'lg' | 'base' | 'sm' | ''
  width?: string
  popperClass?: string
  collapseTags?: boolean
  beforeFilter?: any
}

// Cascader Config
export interface CascaderConfig {
  expandTrigger?: 'click' | 'hover'
  multiple?: boolean
  emitPath?: boolean
  value?: string
  label?: string
  children?: string
  disabled?: string
  leaf?: string
  lazy?: boolean
  lazyLoad?: any
  checkStrictly?: boolean
}

// DatePicker
export interface DatePicker {
  modelValue: Date | string | Array<any>
  type?: string
  format?: string
  valueFormat?: string
  rangeSeparator?: string
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  size?: 'lg' | 'base' | 'sm' | ''
  width?: string
  popperClass?: string
  readonly?: boolean
  editable?: boolean
  disabledDate?: any
  defaultValue?: Date | Array<Date>
  defaultTime?: Date | Array<Date>
  prefixIcon?: any
  teleported?: boolean
}

// Upload
type Awaitable<T> = Promise<T> | T
export interface UploadProps {
  action: string
  headers?: Headers | Record<string, any>
  method?: string
  multiple?: boolean
  data?: object
  showFileList?: boolean
  drag?: boolean
  withCredentials?: boolean
  accept?: string
  name?: string
  crossorigin?: '' | 'anonymous' | 'use-credentials'
  onPreview?: (uploadFile: UploadFile) => void
  onRemove?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onSuccess?: (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onError?: (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onProgress?: (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onChange?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onExceed?: (files: File[], uploadFiles: UploadUserFile[]) => void
  beforeUpload?: (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>
  beforeRemove?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>
  modelValue?: UploadFile[]
  autoUpload?: boolean
  listType?: 'text' | 'picture' | 'picture-card'
  disabled?: boolean
  limit?: number
  httpRequest?: (options: UploadRequestOptions) => XMLHttpRequest | Promise<unknown>
  removeIcon?: any
  successIcon?: any
  failIcon?: any
}

// Transfer
export interface TransferProps {
  modelValue: Array<object>
  data: Array<object>
  filterable?: boolean
  filterablePlaceholder?: string
  targetOrder?: 'original' | 'push' | 'unshift'
  titles?: Array<string>
  buttonTexts?: Array<string>
  renderContent?: object
  format?: object
  props?: object
  leftDefaultChecked?: Array<string | number>
  rightDefaultChecked?: Array<string | number>
  filterMethod?: any
  matchKey?: string
  defaultKeys?: Array<string>
}

// Tag
export interface TagProps {
  type?: string
  color?: string
  closable?: boolean
  size?: 'lg' | 'base' | 'sm' | ''
  round?: boolean
  textColor?: string
}

// Popover
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

// Popconfirm
export interface PopconfirmProps extends PopoverProps {
  icon?: any
  hideIcon?: boolean
  iconColor?: string
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonType?: 'main' | 'secondary' | 'normal' | 'text'
  cancelButtonType?: 'main' | 'secondary' | 'normal' | 'text'
}

// Status
export interface StatusProps {
  type?: 'empty' | 'success' | 'danger' | 'warning'
  content?: string
  icon?: any
  iconColor?: string
  width?: string
  height?: string
  iconSize?: string
}

// MessageProps
export interface MessageProps {
  message?: string | (() => string)
  type?: 'success' | 'info' | 'warning' | 'error'
  plain?: boolean
  icon?: string | Component
  dangerouslyUseHTMLString?: boolean
  customClass?: string
  duration?: number
  showClose?: boolean
  center?: boolean
  offset?: number
  onClose?: () => void
  grouping?: boolean
  appendTo?: string | HTMLElement
  repeatNum?: number
}

// DialogProps
export interface DialogProps {
  modelValue: boolean
  title?: string
  width?: string
  fullscreen?: boolean
  top?: string
  modal?: boolean
  modalClass?: string
  appendToBody?: boolean
  appendTo?: string
  lockScroll?: boolean
  openDelay?: number
  closeDelay?: number
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  beforeClose?: () => boolean
  draggable?: boolean
  overflow?: boolean
  center?: boolean
  alignCenter?: boolean
  destroyOnClose?: boolean
  closeIcon?: Component
  zIndex?: number
}

// Tooltip
export interface TooltipProps extends PopoverProps {
  type?: 'normal' | 'primary' | 'danger' | 'warning'
  color?: string
  textColor?: string
  icon?: Component
  iconSize?: string
}

// Filter
export interface FilterProps {
  modelValue?: any
  data?: any
}

// Drawer
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

// Form
export interface Form {
  model: Record<string, any>
  rules?: Record<string, any>
  inline?: boolean
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string | number
  labelSuffix?: string
  hideRequiredAsterisk?: boolean
  requireAsteriskPosition?: 'left' | 'right'
  showMessage?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  validateOnRuleChange?: boolean
  size?: '' | 'large' | 'default' | 'small'
  disabled?: boolean
  scrollToError?: boolean
  scrollIntoViewOptions?: boolean | Record<string, any>
}
type Arrayable<T> = T | T[];
export interface FormItem {
  props?: string | string[]
  label?: string
  labelWidth?: string | number
  required?: boolean
  rules?: Arrayable<FormItemRule>
  error?: string
  showMessage?: boolean
  inlineMessage?: string | boolean
  size?: '' | 'large' | 'default' | 'small'
  for?: string
  validateStatus?: '' | 'error' | 'validating' | 'success'
}

// step
export interface StepsProps {
  space?: number | string
  direction?: 'vertical' | 'horizontal'
  active?: number
  processStatus?: 'wait' | 'process' | 'finish' | 'error' | 'success'
  finishStatus?: 'wait' | 'process' | 'finish' | 'error' | 'success'
  alignCenter?: boolean
  capsule?: boolean
  height?: string | number
}
export interface StepProps {
  title?: string,
  description?: string,
  icon?: string | Component
  status?: '' | 'wait' | 'process' | 'finish' | 'error' | 'success'
  width?: string | number
  color?: string
}

// Collapse
export interface Collapse {
  modelValue: string | string[]
  accordion?: boolean
}

// View
export interface ViewProps {
  modelValue: string
  width?: number | string
}
export interface ViewItemProps {
  value: any,
  label?: string
  count?: number | string
  disabled?: boolean,
  isCustom?: boolean
}

// Badge
export interface BadgeProps {
  value?: string | number
  max?: number,
  isDot?: boolean
  hidden?: boolean
  color?: string
  showZero?: boolean
  offset?: [number, number]
  badgeStyle?: object
  badgeClass?: string
}

// Timeline
export interface TimelineProps {
  showLine?: boolean
}
export interface TimelineItemProps {
  timestamp?: string
  hideTimestamp?: boolean
  center?: boolean
  placement?: 'top' | 'bottom' | 'right'
  type?: 'primary' | 'success' | 'error' | 'wait'
  color?: string
  icon?: string | Component
  hollow?: boolean
  size?: 'large' | 'normal'
}

// Calendar
export interface CalendarProps {
  modelValue: Date
  schedule?: any
  showLunar?: boolean
  max?: number
}

// Tree
interface PropsType {
  label?: string
  value?: string | number
  children?: string
  disabled?: string
}
export interface TreeProps {
  data: TreeData[]
  emptyText?: string
  props?: PropsType
  highlightCurrent?: boolean
  expandOnClickNode?: boolean
  checkOnClickNode?: boolean
  defaultExpandedKeys?: TreeKey[]
  showCheckbox?: boolean
  checkStrictly?: boolean
  defaultCheckedKeys?: TreeKey[]
  currentNodeKey?: string | number
  filterMethod?: (value:string, data:TreeNode) => void
  indent?: number
  icon?: Component
  itemSize?: number
  showFilter?: boolean
  lazy?: boolean
}

// Tour
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
