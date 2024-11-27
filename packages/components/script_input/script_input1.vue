<template>
  <div class="k-script-input-wrapper">
    <div class="k-script-input-append">
      <slot name="prepend"></slot>
    </div>
    <k-popover
      width="100%"
      :show-arrow="false"
      :visible="popperVisible"
      popper-class="k-script-input-popper"
      @hide="hidePopper"
    >
      <template #reference>
        <div
          ref="KScriptInput"
          :class="['k-script-input', _styleModule]"
          contenteditable
          :spellcheck="false"
          @input="handleInput"
          @blur="handleBlur"
          @focus="handleFocus"
        ></div>
      </template>
      <k-tree-table
        id="k-script-input-tree"
        ref="$tree"
        border="none"
        :use-tree="true"
        :column="columns"
        :data="options"
        :show-search-input="true"
        :show-filter="false"
        :show-header="false"
        :show-page="false"
        :cell-click-toggle-highlight="false"
        :show-description="false"
        :show-refresh="false"
        :row-config="{keyField: 'value', isCurrent: true}"
        :tree-config="{parentField: 'pid', rowField: 'value'}"
        highlight-current
        adaptive
        @cell-click="cellClick"
      ></k-tree-table>
    </k-popover>
    <div class="k-script-input-append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject, onMounted, onBeforeUnmount } from 'vue';
import { ScriptInputProps } from './type';
import { genRandomStr, allTreeDataToArray1 } from '../../utils';

defineOptions({
  name: 'KScriptInput',
});

const _styleModule = inject('_styleModule', '');

const props = withDefaults(defineProps<ScriptInputProps>(), {
  options: () => [],
  size: 'base',
});

const emits = defineEmits(['change', 'input', 'focus', 'blur', 'select', 'update:modelValue']);

onMounted(() => {
 document.addEventListener('keydown', toggleSelect);
});
onBeforeUnmount(() => {
 document.removeEventListener('keydown', toggleSelect);
});

const prefix = `_${genRandomStr(8)}`;
const KScriptInput = ref();
const $tree = ref();
let preTextValue: string = '';
const curInput = ref('');
const textValue = ref('');
const selectedIndex = ref<number>(0);
const popperVisible = ref(false);
const columns = [
  { field: 'label', label: '', treeNode: true }
]

const flattedOptions = computed(() => {
  const tableData = $tree.value?.getTableData().fullData?? [];
  return allTreeDataToArray1(tableData, 'children') ?? [];
});

watch(() => curInput.value, () => {
  if (curInput.value === '') {
    popperVisible.value = false;
    return;
  }
  $tree.value?.filter(curInput.value);
  if ($tree.value?.getVisibleData()?.length) {
    popperVisible.value = true;
  } else {
    popperVisible.value = false;
  }
}, { immediate: true })
// watch(() => props.modelValue, () => {
//   console.log(props.modelValue)
//   const type = typeof props.modelValue;
//   if ((type !== 'string' && type !== 'number') || props.modelValue === undefined) {
//     console.warn(`'modelValue' must be a string or number, but got ${type}`);
//     return;
//   }
//   nextTick(() => {
//     clear();
//     textValue.value = props.modelValue.toString();
//     preTextValue = textValue.value;
//   });
// }, {immediate: true})

watch(() => textValue.value, () => {
  emits('update:modelValue', parseText())
}, {immediate: true})

function handleInput(event: InputEvent) {
  if (!(event.target instanceof HTMLElement)) {
    return;
  }
  if (event.data === ' ') {
    curInput.value = '';
  } else if(event.data === null) {
    curInput.value = curInput.value.slice(0, -1);
  } else {
    curInput.value += event.data ?? '';
  }
  textValue.value = KScriptInput.value.innerHTML;
}
function handleFocus() {
  emits('focus');
}
function handleBlur() {
  if (preTextValue!== textValue.value) {
    preTextValue = textValue.value;
    parseText();
  }
  emits('blur');
}
function cellClick({ row }: { row: any}) {
  const rowIndex = flattedOptions.value.findIndex((item) => item.value === row.value);
  selectedIndex.value = rowIndex;
  if (row.children?.length) {
    return;
  }
  selectOption(row);
}
function selectOption(data: any) {
  let endIndex = curInput.value.length ? -curInput.value.length : undefined;
  textValue.value = textValue.value.slice(0, endIndex);
  curInput.value = '';
  textValue.value += generateScriptTag(data.label)
  preTextValue = textValue.value;
  KScriptInput.value.innerHTML = textValue.value;
  cursorToEnd();
  emits('select', data);
}
function parseText() {
  let text = textValue.value;
  const replaceReg = /<div[^>]*>(.*?)<\/div>/
  while (replaceReg.test(text)) {
    const regex = />([\s\S]*?)<\/div>/;
    const label = text.match(regex)?.[1] ?? '';
    text = text.replace(replaceReg, `${prefix}-${label}&nbsp;`);
  }
  const res = text.split('&nbsp;')
    .filter((item) => item !== '')
    .map((item) => {
      if (item.startsWith(prefix + '-')) {
        const label = item.slice(10);
        const targetOption = props.options.find((item) => item.label === label);
        return targetOption?.value ?? null;
      }
      return item;
    })
    .join(' ');
  emits('change', res);
  return res;
}
function generateScriptTag(content: string) {
  return `<div class="k-script-tag" contenteditable="false">${content}</div>`
}
function toggleSelect(event: KeyboardEvent) {
  const dataLength = flattedOptions.value.length;
  if (event.code === 'ArrowUp') {
    selectedIndex.value = (selectedIndex.value - 1 + dataLength) % dataLength;
    while (isHideNode(flattedOptions.value[selectedIndex.value])) {
      selectedIndex.value = (selectedIndex.value - 1 + dataLength) % dataLength;
    }
  } else if (event.code === 'ArrowDown') {
    selectedIndex.value = (selectedIndex.value + 1) % dataLength;
    while (isHideNode(flattedOptions.value[selectedIndex.value])) {
      selectedIndex.value = (selectedIndex.value + 1) % dataLength;
    }
  }
  const targetOption = flattedOptions.value[selectedIndex.value];
  const row = $tree.value?.getRowById(targetOption?.value);
  if (row) {
    $tree.value.setCurrentRow(row);
  }
  if (event.code === 'Enter') {
    event.preventDefault();
    if (row.children?.length && !row.optional) {
      $tree.value?.toggleTreeExpand(row);
    } else {
      selectOption(targetOption);
    }
  }
}

function isHideNode(rowData: any) {
  const parentRow = $tree.value?.getRowById(rowData?.pid);
  if (!parentRow) {
    return false;
  }
  return Boolean(!$tree.value?.isTreeExpandByRow(parentRow) && rowData.pid);
}
// 解决输入非字符内容时光标无法移到最后的问题
function cursorToEnd() {
  if (window.getSelection) {
    KScriptInput.value.focus();
    const range = window.getSelection();
    range?.selectAllChildren(KScriptInput.value);
    range?.collapseToEnd();
  }
}
function hidePopper() {
  selectedIndex.value = 0;
  $tree.value?.setCurrentRow(null);
  $tree.value?.clearTreeExpand();
}
function clear() {
  KScriptInput.value.innerHTML = '';
  textValue.value = '';
  preTextValue = '';
  curInput.value = '';
}

defineExpose({
  clear
})
</script>
<style lang="less">
@import './style.less';
</style>
