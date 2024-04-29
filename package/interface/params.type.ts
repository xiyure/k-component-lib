import {
  UploadRequestOptions,
  UploadFile,
  UploadFiles,
  UploadRawFile,
  UploadUserFile,
  UploadProgressEvent
} from 'element-plus';

// Button
export interface IButtonProps {
  type?: string,
  size?: string,
  status?: string,
  iconRight?: any,
  iconLeft?: any,
  value?: string,
  disabled?: boolean,
  loading?: boolean,
  loadingIcon?: object
}

// Tab
export interface ITabItemProps {
  label?: string,
  name: string,
  path?: string,
  closable?: boolean,
  disabled?: boolean,
  icon?: any
}

// Input
export interface IInputProps {
  id?: string,
  name?: string,
  label?: string,
  modelValue: string | number,
  type?: string,
  width?: string,
  prefixIcon?: any,
  suffixIcon?: any,
  disabled?: boolean,
  placeholder?: string,
  size?: string,
  clearable?: boolean,
  readonly?: boolean,
  showWordLimit?: boolean,
  autosize?: boolean | object,
  showPassword?: boolean,
  rows?: number,
  maxlength?: string | number,
  minlength?: string | number,
  prependClassName?: string,
  appendClassName?: string
}

// InputNumber
export interface IInputNumberProps {
  id?: string,
  name?: string,
  label?: string,
  modelValue: number | null,
  width?: string,
  disabled?: boolean,
  placeholder?: string,
  size?: string,
  readonly?: boolean,
  min?: number,
  max?: number,
  step?: number,
  stepStrictly?: boolean,
  precision?: number,
  controls?: boolean,
  controlsPosition?: string
}

// Pagination
export interface IPaginationProps {
  total: number,
  pageSize?: number,
  pageSizes?: object,
  disabled?: boolean,
  size?: string,
  background?: boolean,
  layout?: string
}

// Switch
export interface ISwitchProps {
  modelValue: boolean,
  switchOnColor?: string,
  switchOffColor?: string,
  activeText?: string,
  inactiveText?: string,
  disabled?: boolean,
  width?: string,
  loading?: boolean,
  size?: string
}

// Radio/Checkbox
export interface ISelectButtonProps {
  modelValue?: any,
  value: any,
  disabled?: boolean,
  size?: string,
  label?: string,
  indeterminate?: boolean,
  color?: string
}

// RadioGroup/CheckboxGroup
export interface ISelectButtonGroupProps {
  modelValue: any,
  disabled?: boolean,
  size?: string,
  color?: string
}

// Select
export interface ISelectInputProps {
  modelValue: any,
  multiple?: boolean,
  disabled?: boolean,
  clearable?: boolean,
  placeholder?: string,
  filterable?: boolean,
  allowCreate?: boolean,
  size?: string,
  width?: string,
  popperClass?: string
}

// Select Option
export interface IOptionProps {
  value: any,
  label: string,
  disabled?: boolean
}

// Cascader
export interface ICascaderProps {
  modelValue: any,
  options?: object,
  props?: object,
  showAllLevels?: boolean,
  separator?: string,
  disabled?: boolean,
  clearable?: boolean,
  placeholder?: string,
  filterable?: boolean,
  size?: string,
  width?: string,
  popperClass?: string,
  collapseTags?: boolean,
  beforeFilter?: any
}

// Cascader Config
export interface ICascaderConfig {
  expandTrigger?: 'click' | 'hover',
  multiple?: boolean,
  emitPath?: boolean,
  value?: string,
  label?: string,
  children?: string,
  disabled?: string,
  leaf?: string,
  lazy?: boolean,
  lazyLoad?: any,
  checkStrictly?: boolean
}

// IDatePicker
export interface IDatePicker {
  modelValue: Date | string | Array<any>,
  type?: string,
  format?: string,
  valueFormat?: string,
  rangeSeparator?: string,
  disabled?: boolean,
  clearable?: boolean,
  placeholder?: string,
  startPlaceholder?: string,
  endPlaceholder?: string,
  size?: string,
  width?: string,
  popperClass?: string,
  readonly?: boolean,
  editable?: boolean,
  disabledDate?: any,
  defaultValue?: Date | Array<Date>,
  defaultTime?: Date | Array<Date>,
  prefixIcon?: any
}

// IUpload
type Awaitable<T> = Promise<T> | T
export interface IUpload {
  action: string,
  headers?: Headers | Record<string, any>,
  method?: string,
  multiple?: boolean,
  data?: object,
  showFileList?: boolean,
  drag?: boolean,
  withCredentials?: boolean,
  accept?: string,
  name?: string,
  crossorigin?: '' | 'anonymous' | 'use-credentials',
  onPreview?: (uploadFile: UploadFile) => void,
  onRemove?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void,
  onSuccess?: (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void,
  onError?: (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void,
  onProgress?: (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void,
  onChange?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void,
  onExceed?: (files: File[], uploadFiles: UploadUserFile[]) => void,
  beforeUpload?: (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>,
  beforeRemove?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>,
  modelValue?: UploadFile[],
  autoUpload?: boolean,
  listType?: 'text' | 'picture' | 'picture-card',
  disabled?: boolean,
  limit?: number,
  httpRequest?: (options: UploadRequestOptions) => XMLHttpRequest | Promise<unknown>,
  removeIcon?: any,
  successIcon?: any,
  failIcon?: any
}

// Transfer
export interface ITransferProps {
  modelValue: Array<object>,
  data: Array<object>,
  filterable?: boolean,
  filterablePlaceholder?: string,
  targetOrder?: 'original' | 'push' | 'unshift',
  titles?: Array<string>,
  buttonTexts?: Array<string>,
  renderContent?: object,
  format?: object,
  props?: object,
  leftDefaultChecked?: Array<string | number>,
  rightDefaultChecked?: Array<string | number>,
  filterMethod?: any,
  matchKey?: string,
  defaultKeys?: Array<string>
}

// Tag
export interface ITagProps {
  type?: string,
  color?: string,
  closable?: boolean,
  size?: string,
  round?: boolean,
  textColor?: string
}

// Popover
export interface IPopoverProps {
  trigger?: 'click' | 'hover',
  title?: string,
  content?: string,
  width?: string | number,
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' |
    'bottom-end' | 'left' | 'left-start' | 'left-end '| 'right' | 'right-start' | 'right-end,',
  disabled?: boolean,
  visible?: boolean,
  offset?: number,
  transition?: string,
  popperOptions?: object,
  showArrow?: boolean,
  popperClass?: string,
  popperStyle?: object,
  showAfter?: number,
  hideAfter?: number,
  autoClose?: number,
  teleported?: boolean,
  persistent?: boolean
}

// Popconfirm
export interface IPopconfirmProps extends IPopoverProps {
  icon?: any,
  hideIcon?: boolean,
  iconColor?: string,
  confirmButtonText?: string,
  cancelButtonText?: string,
  confirmButtonType?: 'main' | 'secondary' | 'normal' | 'text',
  cancelButtonType?: 'main' | 'secondary' | 'normal' | 'text'
}