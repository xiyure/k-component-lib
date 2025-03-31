import type { ShallowRef } from 'vue'

interface SelectionInfo {
  selectionStart?: number
  selectionEnd?: number
  value?: string
  beforeTxt?: string
  afterTxt?: string
}

export function useCursor(
  input: ShallowRef<HTMLInputElement & { $el: HTMLInputElement } | undefined>
): { recordCursor :() => void, setCursor: () => void } {
  let selectionInfo: SelectionInfo
  function recordCursor() {
    const $el = getInputElem();
    if (!$el) return

    const { selectionStart, selectionEnd, value } = $el

    if (selectionStart == null || selectionEnd == null) return

    const beforeTxt = value.slice(0, Math.max(0, selectionStart))
    const afterTxt = value.slice(Math.max(0, selectionEnd))

    selectionInfo = {
      selectionStart,
      selectionEnd,
      value,
      beforeTxt,
      afterTxt,
    }
  }
  function setCursor() {
    const $el = getInputElem();
    if (selectionInfo == undefined || !$el) return

    const { value } = $el
    const { beforeTxt, afterTxt, selectionStart } = selectionInfo

    if (
      beforeTxt == undefined ||
      afterTxt == undefined ||
      selectionStart == undefined
    )
      return

    let startPos = value.length

    if (value.endsWith(afterTxt)) {
      startPos = value.length - afterTxt.length
    } else if (value.startsWith(beforeTxt)) {
      startPos = beforeTxt.length
    } else {
      const beforeLastChar = beforeTxt[selectionStart - 1]
      const newIndex = value.indexOf(beforeLastChar, selectionStart - 1)
      if (newIndex !== -1) {
        startPos = newIndex + 1
      }
    }

    $el.setSelectionRange(startPos, startPos)
  }
  function getInputElem() {
    if (!input.value) return;
    const $el = input.value?.$el ? input.value.$el : input.value;
    return $el?.querySelector('input') as HTMLInputElement | undefined;
  }

  return { recordCursor, setCursor }
}
