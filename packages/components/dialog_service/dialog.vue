<template>
  <div ref="root" class="k-dialogs">
    <k-dialog
      v-for="dialog in dialogs"
      v-bind="dialog.attrs"
      :id="dialog.id"
      :key="dialog.id"
      @closed="onClose(dialog.id)"
    >
      <template v-for="(_, key) in dialog.slots" #[key] :key>
        <component :is="dialog.slots[key]" />
      </template>
    </k-dialog>
  </div>
</template>

<script lang="tsx" setup>
import { ref, reactive, nextTick } from 'vue';
import { KDialog } from '../dialog';
import { KForm, KFormItem } from '../form';
import { KMessage } from '../message';
import { KCheckboxGroup, KCheckbox } from '../checkbox';
import { KInput } from '../input';
import { KButton } from '../button';
import { KSelect } from '../select';
import { genRandomStr } from '../../utils';
import { useLocale } from '../../hooks';
import { SlotsType } from '../../utils/typescript';
import { DialogServiceOptions, DialogOptions, FormOptions, FormItemOptions, CommonOption, RenderType, DialogServiceSlotsParams } from './type';


const { t } = useLocale();
const dialogs = reactive<{
  id: string,
  attrs: DialogOptions & { modelValue: boolean },
  slots: {
    header: () => SlotsType,
    default: () => SlotsType,
    footer: () => SlotsType,
  }
}[]>([])
const resolveMap = new Map() // dialog id -> resolve
const root = ref()

// handle default form
function genFormAttrsItemVNode(fAttrs: FormOptions, items: FormItemOptions[]): [FormOptions, RenderType] {
  const model = items.reduce((fData: any, item: FormItemOptions) => {
    const { prop, value = ''} = item;
    if (!prop) {
      return console.warn('exist form item without prop')
    }
    fData[prop as string] = value
    return fData
  }, {});

  const formAttrs = reactive<FormOptions>({
    labelPosition: 'top',
    model,
    labelWidth: '100',
    ...fAttrs
  })

  // formItems
  const formItems = items.map((item: FormItemOptions) => {
    const formItem = reactive(item ?? {})
    const renderContent = getFormItemRender(formAttrs, formItem);
    if (item.noFormItemWrap && typeof renderContent === 'function') {
      return renderContent()
    }
    return (
      <KFormItem {...formItem}>
        {renderContent}
      </KFormItem>
    )
  })
  return [formAttrs, formItems]
}
// get formItem render function
function getFormItemRender (formAttrs: FormOptions, formItem: FormItemOptions) {
    const { attrs: compAttrs, type, prop, render } = formItem;
    const _props = prop as string
    if (typeof render === 'function') {
      return render(formItem, formAttrs.model,formAttrs);
    }
    switch (type) {
      case 'select':
        if (!Array.isArray(formItem.options)) {
          console.error('please provide correct options for select type')
          return;
        }
        return () => (
          <KSelect v-model={formAttrs.model[_props]} {...compAttrs}>
            {reactive(formItem.options as CommonOption[]).map((op) => {
              return <k-option label={op.label} value={op.value}></k-option>
            })}
          </KSelect>
        )
      case 'checkbox':
        return () => <KCheckbox v-model={formAttrs.model[_props]} {...compAttrs} />
      case 'checkboxGroup':
        if (!Array.isArray(formItem.options)) {
          console.error('checkboxGroup 类型需要传入正确的 options')
          return
        }
        return () => (
          <KCheckboxGroup v-model={formAttrs.model[_props]}>
            {reactive(formItem.options as CommonOption[]).map((op) => {
              return <KCheckbox label={op.label} value={op.value}></KCheckbox>
            })}
          </KCheckboxGroup>
        )
      default:
        return () => <KInput v-model={formAttrs.model[_props]} {...compAttrs} />
    }
}


function showDialog ({
  id = `dialog_${genRandomStr(8)}`,
  attrs,
  slots = {},
  formItems,
  formAttrs = {},
  confirm,
  cancel,
  penetratePointer = false,
  showDefaultFooter = true,
  showCancelButton = true,
  showConfirmButton = true,
  confirmButtonText = t('dialog.confirm'),
  cancelButtonText = t('dialog.cancel'),
  ...rest
}: DialogServiceOptions) {
  attrs = attrs ?? rest;
  penetratePointer && (attrs.modal = false)
  // if param slots ids a function, then convert it to default slot
  if (typeof slots === 'function') {
    slots = {
      default: slots
    }
  }
  if (formItems) {
    if (slots.default) {
      return Promise.reject(new TypeError('formItems and default slots cannot be used together'))
    }
  } else if (!slots.default) {
    return Promise.reject(new TypeError('must provide default slot or formItems'))
  }

  // dialog 的属性
  const dialogAttrs = reactive({
    draggable: true,
    modelValue: true,
    closeOnClickModal: false,
    width: '500',
    alignCenter: true,
    ...attrs
  })

  const close = () => {
    dialogAttrs.modelValue = false
  }

  const cntRef = ref<any>(null)
  let fAttrs: FormOptions | undefined;
  let fItems: RenderType | undefined;
  const slotParams: DialogServiceSlotsParams = {
    ref: cntRef,
    dialogAttrs,
    formAttrs,
    formItems,
    confirm: null,
    cancel: null,
    close
  }

  const dialogSlots = {
    header: () => {
      if (slots.header) {
        return slots.header(slotParams)
      }
      return <div class='el-dialog__title'>{dialogAttrs.title}</div>
    },
    default: () => {
      if (slots.default) {
        return slots.default(slotParams)
      }
      ;[fAttrs, fItems] = genFormAttrsItemVNode(formAttrs, formItems as FormItemOptions[])
      return (
        <KForm ref={cntRef} {...fAttrs}>
          {{ default: () => fItems }}
        </KForm>
      )
    },
    footer: () => {
      if (!showDefaultFooter) return () => null
      slotParams.confirm = async (payload: any) => {
        // 需要验证
        if (typeof cntRef.value?.validate === 'function') {
          await cntRef.value.validate?.()
        }
        try {
          if (payload instanceof Event) {
            payload = { ok: true, dialogAttrs }
            if (formItems) {
              payload.form = fAttrs?.model
              payload.formAttrs = fAttrs
            } else if (typeof cntRef.value?.getResult === 'function') {
              payload.result = await cntRef.value?.getResult()
            }
          } else {
            payload = { ok: true, result: payload }
          }
          if (typeof confirm === 'function') {
            await confirm(
              close,
              payload
            )
          } else {
            resolveDialog(id, payload)
            close()
          }
        } catch (err: any) {
          // 兼容下确定时 调用接口抛出的错误
          KMessage.error(err.error ? err.error.toString() : err.toString())
        }
      }
      slotParams.cancel = async () => {
        try {
          if (typeof cancel === 'function') {
            await cancel(dialogAttrs, fAttrs, formItems)
          }
          dialogAttrs.modelValue = false
        } catch (err: any) {
          KMessage.error(err.toString())
        }
      }
      if (slots.footer) {
        slotParams.formAttrs = fAttrs;
        return slots.footer(slotParams)
      }
      const hasLeft = typeof slots.footerLeft === 'function'
      return (
        <div class={'k-dialog-service-footer' + (hasLeft ? ' k-dialog-service-footer-has-left' : '')}>
          {hasLeft ? (
            <div class='k-dialog-service-footer-left'>{slots.footerLeft?.(slotParams)}</div>
          ) : (
            ''
          )}
          {showCancelButton !== false && <KButton class={'k-dialog-service-cancel-button__default'} onClick={slotParams.cancel}>{cancelButtonText}</KButton>}
          {showConfirmButton !== false && (
            <KButton onClick={slotParams.confirm} main>
              {confirmButtonText}
            </KButton>
          )}
        </div>
      )
    }
  }

  dialogs.push({
    id,
    attrs: dialogAttrs,
    slots: dialogSlots
  })

  if (penetratePointer) {
    nextTick().then(() => {
      const container = dialogAttrs.appendTo ?? root.value
      /** @type {HTMLElement} */
      const el = container.querySelector(`#${id}`)
      if (el) {
        el.style.pointerEvents = 'auto'
      }
      let parent = el.parentElement
      while (parent !== container) {
        parent.style.pointerEvents = 'none'
        parent = parent.parentElement
      }
    })
  }

  if (typeof confirm === 'function') {
    return close;
  }

  // 返回一个 promise
  return new Promise((resolve) => {
    resolveMap.set(id, resolve)
  })
}

function resolveDialog(id :string, payload: any) {
  const resolve = resolveMap.get(id)
  if (resolve) {
    resolve(payload)
    resolveMap.delete(id)
  }
}

function onClose (id: string) {
  resolveDialog(id, { ok: false })
  const i = dialogs.findIndex((dialog) => dialog.id === id)
  i !== -1 && dialogs.splice(i, 1)
}

defineExpose({
  showDialog
})
</script>

<style lang="less">
@import './style.less';
</style>
