import {
  UploadRequestOptions,
  UploadFile,
  UploadFiles,
  UploadRawFile,
  UploadUserFile,
  UploadProgressEvent,
  FormItemRule
} from 'element-plus';
import { Component } from 'vue';

// Button
export interface IButtonProps {
  type?: 'main' | 'secondary' | 'text' | 'normal'
  size?: string
  status?: string
  iconRight?: any
  iconLeft?: any
  value?: string
  disabled?: boolean
  loading?: boolean
  loadingIcon?: object
}

// Tab
export interface ITabItemProps {
  label?: string
  name: string
  path?: string
  closable?: boolean
  disabled?: boolean
  icon?: any
}

// Input
export interface IInputProps {
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
  size?: string
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
export interface IInputNumberProps {
  id?: string
  name?: string
  label?: string
  modelValue: number | null
  width?: string
  disabled?: boolean
  placeholder?: string
  size?: string
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
export interface IPaginationProps {
  total: number
  pageSize?: number
  pageSizes?: object
  disabled?: boolean
  size?: string
  background?: boolean
  layout?: string
}

// Switch
export interface ISwitchProps {
  modelValue: boolean
  switchOnColor?: string
  switchOffColor?: string
  activeText?: string
  inactiveText?: string
  disabled?: boolean
  width?: string
  loading?: boolean
  size?: string
}

// Radio/Checkbox
export interface ISelectButtonProps {
  modelValue?: any
  value: any
  checked?: boolean
  disabled?: boolean
  size?: string
  label?: string | number
  indeterminate?: boolean
  color?: string
}

// RadioGroup/CheckboxGroup
export interface ISelectButtonGroupProps {
  modelValue?: any
  disabled?: boolean
  size?: string
  color?: string
}

// Select
export interface ISelectInputProps {
  modelValue: any
  multiple?: boolean
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  filterable?: boolean
  allowCreate?: boolean
  size?: string
  width?: string
  popperClass?: string
  teleported?: boolean
}

// Select Option
export interface IOptionProps {
  value: any
  label: string
  disabled?: boolean
}

// Cascader
export interface ICascaderProps {
  modelValue: any
  options?: object
  props?: object
  showAllLevels?: boolean
  separator?: string
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  filterable?: boolean
  size?: string
  width?: string
  popperClass?: string
  collapseTags?: boolean
  beforeFilter?: any
}

// Cascader Config
export interface ICascaderConfig {
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
export interface IDatePicker {
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
  size?: string
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
export interface IUpload {
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
export interface ITransferProps {
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
export interface ITagProps {
  type?: string
  color?: string
  closable?: boolean
  size?: string
  round?: boolean
  textColor?: string
}

// Popover
export interface IPopoverProps {
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
export interface IPopconfirmProps extends IPopoverProps {
  icon?: any
  hideIcon?: boolean
  iconColor?: string
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonType?: 'main' | 'secondary' | 'normal' | 'text'
  cancelButtonType?: 'main' | 'secondary' | 'normal' | 'text'
}

// Status
export interface IStatusProps {
  type?: 'empty' | 'success' | 'danger' | 'warning'
  content?: string
  icon?: any
  iconColor?: string
  width?: string
  height?: string
  iconSize?: string
}

// MessageProps
export interface IMessageProps {
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
export interface IDialogProps {
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
export interface ITooltipProps extends IPopoverProps {
  type?: 'normal' | 'primary' | 'danger' | 'warning'
  color?: string
  textColor?: string
  icon?: Component
  iconSize?: string
}

// Filter
export interface IFilterProps {
  modelValue?: any
  data?: any
}

// Drawer
export interface IDrawerProps {
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
export interface IForm {
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
export interface IFormItem {
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
export interface IStepsProps {
  space?: number | string
  direction?: 'vertical' | 'horizontal'
  active?: number
  processStatus?: 'wait' | 'process' | 'finish' | 'error' | 'success'
  finishStatus?: 'wait' | 'process' | 'finish' | 'error' | 'success'
  alignCenter?: boolean
  capsule?: boolean
  height?: string | number
}
export interface IStepProps {
  title?: string,
  description?: string,
  icon?: string | Component
  status?: '' | 'wait' | 'process' | 'finish' | 'error' | 'success'
  width?: string | number
  color?: string
}

// Collapse
export interface ICollapse {
  modelValue: string | string[]
  accordion?: boolean
}
