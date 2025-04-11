import { Ref } from 'vue';
import { DialogProps, FormProps, FormItemProps } from 'element-plus';
import { SlotsType, Writable } from '../../utils';

export interface DialogOptions extends Omit<Partial<Writable<DialogProps>>, 'modelValue'> {}
export interface FormOptions extends Partial<Writable<FormProps>> {}
export interface FormItemOptions extends Partial<Writable<FormItemProps>> {
  type?: 'select' | 'input' | 'checkbox' | 'checkboxGroup'
  attrs?: any
  render?: (formItem: FormItemOptions, formData: any, form: FormOptions) => RenderType
  value?: any
  options?: {
    label: string
    value: any
    disabled?: boolean
  }[];
  noFormItemWrap?: boolean
}

export type DialogSlots = {
  header?: (params: DialogServiceSlotsParams) => SlotsType
  default?: (params: DialogServiceSlotsParams) => SlotsType
  footer?: (params: DialogServiceSlotsParams) => SlotsType
  footerLeft?: (params: DialogServiceSlotsParams) => SlotsType
}

export type RenderType = SlotsType

export interface DialogServiceOptions {
  id?: string
  attrs?: DialogOptions
  slots?: DialogSlots
  formAttrs?: FormOptions
  formItems?: FormItemOptions[]
  penetratePointer?: boolean
  showDefaultFooter?: boolean
  showCancelButton?: boolean
  showConfirmButton?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  confirm?: (close: () => void, payload: any) => void | Promise<void>
  cancel?: (dialogAttrs:DialogOptions, formAttrs: FormOptions, formItems: FormItemOptions[]) => Promise<void> | void
}

export type CommonOption = {
  label: string
  value: any
}

export type DialogServiceSlotsParams = {
  ref: Ref<any>
  dialogAttrs: DialogOptions
  formAttrs: FormOptions | undefined
  formItems: FormItemOptions[] | undefined
  confirm: ((payload: any) => void) | null
  cancel: (() => void) | null
  close: () => void
}

export type DialogConfirmParams = {

}