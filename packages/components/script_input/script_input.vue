<template>
  <div class="k-script-input-wrapper" ref="KScriptInputWrapper">
    <div class="k-script-input-prepend">
      <slot name="prepend"></slot>
    </div>
    <k-popover
      :width="popoverWidth"
      :show-arrow="false"
      :visible="popperVisible && _isStringMode"
      :popper-class="`k-script-input-popper ${dynamicClassName}`"
      @show="onShowPopper"
      @hide="onHidePopper"
    >
      <template #reference>
        <el-scrollbar class="flex-1">
          <div
            ref="KScriptInput"
            :class="['k-script-input', _styleModule]"
            contenteditable
            :spellcheck="false"
            @input="handleInput"
            @blur="handleBlur"
            @focus="handleFocus"
            @compositionstart="
              () => {
                isAllowInput = false;
              }
            "
            @compositionend="
              (e: InputEvent) => {
                isAllowInput = true;
                handleInput(e);
              }
            "
          ></div>
        </el-scrollbar>
      </template>
      <k-tree-table
        id="k-script-input-tree"
        ref="$tree"
        border="none"
        :use-tree="useTree"
        :column="columns"
        :data="options"
        :show-search-input="isShowInput"
        :show-filter="false"
        :show-header="false"
        :show-page="false"
        :show-header-tools="isShowInput"
        :cell-click-toggle-highlight="false"
        :show-description="false"
        :show-refresh="false"
        :row-config="{
          keyField: 'value',
          isCurrent: true,
          currentMethod: ({ row }) => {
            return row.optional !== false;
          },
        }"
        :row-class-name="
          ({ row }) => {
            if (row.optional === false && !row.children?.length) {
              return 'k-script-input-tree-disabled';
            }
            return '';
          }
        "
        :tree-config="{ parentField: 'pid', rowField: 'value' }"
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
import {
  ref,
  computed,
  watch,
  inject,
  onMounted,
  onBeforeUnmount,
  nextTick,
  onUnmounted,
} from 'vue';
import { ScriptInputProps } from './type';
import { genRandomStr, allTreeDataToArray } from '../../utils';

defineOptions({
  name: 'KScriptInput',
});

const _styleModule = inject('_styleModule', '');

const props = withDefaults(defineProps<ScriptInputProps>(), {
  options: () => [],
  size: 'base',
  useTree: false,
});

const emits = defineEmits(['change', 'input', 'focus', 'blur', 'select', 'update:modelValue']);

onMounted(() => {
  document.addEventListener('keydown', toggleSelect);
  document.addEventListener('click', hidePopperByClick);
  handleResize();
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', toggleSelect);
  document.removeEventListener('click', hidePopperByClick);
});

const prefix = `_${genRandomStr(8)}`;
const dynamicClassName = `_${genRandomStr(8)}`;
const KScriptInput = ref();
const $tree = ref();
let preTextValue: string = '';
const isAllowInput = ref(true);
let cacheRes = '';
const curInput = ref('');
const textValue = ref('');
const selectedIndex = ref<number>(0);
const popperVisible = ref(false);
const columns = [{ field: 'label', label: '', treeNode: true }];
let isManual = false;
const _isStringMode = ref(true)

const isShowInput = ref(false);

const KScriptInputWrapper = ref();
const popoverWidth = ref(0);

// 监测窗口发生变化后
window.addEventListener('resize', handleResize);

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

function handleResize() {
  // 获取 KScriptInputWrapper 的 宽度
  popoverWidth.value = KScriptInputWrapper.value?.offsetWidth ?? 0;
}

const flattedOptions = computed(() => {
  const tableData = $tree.value?.getTableData().fullData ?? [];
  return allTreeDataToArray(tableData, 'children') ?? [];
});

watch(
  () => curInput.value,
  () => {
    if (curInput.value === '' && !isManual) {
      popperVisible.value = false;
      return;
    }
    $tree.value?.filter(curInput.value);
    if ($tree.value?.getVisibleData()?.length) {
      popperVisible.value = true;
    } else {
      popperVisible.value = false;
    }
  },
  { immediate: true },
);
watch(
  () => props.modelValue,
  (newValue) => {
    const type = typeof newValue;
    if ((type !== 'string' && type !== 'number') || newValue === undefined) {
      console.warn(`'modelValue' must be a string or number, but got ${type}`);
      return;
    }
    if (newValue === cacheRes) {
      return;
    }
    nextTick(() => {
      clear();
      preTextValue = textValue.value;
      textValue.value = parseModelValue(newValue.toString());
      KScriptInput.value.innerHTML = textValue.value;
    });
  },
  { immediate: true },
);

watch(
  () => textValue.value,
  () => {
    const res = parseText();
    cacheRes = res;
    emits('update:modelValue', res);
  },
  { immediate: true },
);

function handleInput(event: InputEvent) {
  if (!(event.target instanceof HTMLElement) || !isAllowInput.value) {
    return;
  }
  if (event.data === ' ') {
    curInput.value = '';
  } else if (event.data === null) {
    curInput.value = curInput.value.slice(0, -1);
  } else {
    curInput.value += event.data ?? '';
  }
  preTextValue = textValue.value;
  textValue.value = KScriptInput.value.innerHTML;
}
function handleFocus() {
  emits('focus');
}
function handleBlur() {
  emits('blur');
}
function cellClick({ row }: { row: any }) {
  if (row.optional === false) {
    return;
  }
  const rowIndex = flattedOptions.value.findIndex((item) => item.value === row.value);
  selectedIndex.value = rowIndex;
  if (row.children?.length) {
    return;
  }
  selectOption(row);
}
function selectOption(data: any) {
  removeInvalidChar();
  textValue.value = textValue.value + generateScriptTag(data.label);
  curInput.value = '';
  preTextValue = textValue.value;
  KScriptInput.value.innerHTML = textValue.value;
  cursorToEnd();
  emits('select', data);
  popperVisible.value = false;
}
function removeInvalidChar() {
  const text = textValue.value;
  const index = text.lastIndexOf(curInput.value);
  if (index === -1) {
    return;
  }
  textValue.value = text.slice(0, index) + text.slice(index + curInput.value.length);
}
function parseText() {
  let text = parseValue();
  const replaceReg = /<div[^>]*>(.*?)<\/div>/;
  while (replaceReg.test(text)) {
    const regex = />([\s\S]*?)<\/div>/;
    let label = text.match(regex)?.[1] ?? '';
    if (_isStringMode.value) {
      label = fxSet.has(label) ? `fx(${label})` : `${prefix}-${label}&nbsp;` ;
    }
    text = text.replace(replaceReg, label);
  }
  const res = text
    .split(/&nbsp;| /g)
    .filter((item) => item !== '')
    .map((item) => {
      if (item.startsWith(prefix + '-')) {
        const label = item.slice(10);
        const targetOption = props.options.find((item) => item.label === label);
        return `fx(${targetOption?.value ?? null})`;
      }
      return item;
    })
    .join(' ');
  const result = formatter(res);
  emits('input', result);
  return result;
}
function parseValue() {
  let text = textValue.value;
  const divTagReg = /<div>(.*?)<\/div>/;
  while (divTagReg.test(text)) {
    const regex = /<div>([\s\S]*?)<\/div>/;
    const divLabel = text.match(regex)?.[1] ?? '';
    text = text.replace(divTagReg, `&nbsp;${divLabel}`);
  }
  return text;
}
const funcReg = /fx\((.*?)\)/;
const fxSet = new Set();
function parseModelValue(value: string) {
  let originText = value.replace(/''/g, "'");
  if (!isStringMode()) {
    return originText;
  }
  while (funcReg.test(originText)) {
    const match = originText.match(funcReg)
    if (match?.[0] === undefined || match?.[1] === undefined) {
      break;
    }
    fxSet.add(match[1]);
    originText = originText.replace(match?.[0], generateScriptTag(match[1]));
  }
  return originText;
}
function formatter(str: string) {
  const reg = /fx\((.*?)\)/;
  str = str.replace(/\'/g, "''");
  if (!_isStringMode.value) {
    return str;
  }
  let newStr = '';
  while (reg.test(str)) {
    const match = str.match(reg)?.[0] ?? '';
    const index = str.indexOf(match);
    const targetText = str.slice(0, index);
    if (targetText?.length) {
      newStr += `'${targetText}'`;
    }
    newStr += match;
    str = str.slice(index + match.length);
  }
  if (str?.length) {
    newStr += `'${str}'`;
  }
  return newStr;
}
function generateScriptTag(content: string) {
  return `<div class="k-script-tag" contenteditable="false">${content}</div>`;
}
function toggleSelect(event: KeyboardEvent) {
  const dataLength = flattedOptions.value.length;
  const headerElement = document.querySelector(`.${dynamicClassName} .el-input__inner`);
  if (event.code === 'ArrowUp') {
    selectedIndex.value = (selectedIndex.value - 1 + dataLength) % dataLength;
    while (
      isHideNode(flattedOptions.value[selectedIndex.value]) ||
      flattedOptions.value[selectedIndex.value].optional === false
    ) {
      selectedIndex.value = (selectedIndex.value - 1 + dataLength) % dataLength;
    }
  } else if (event.code === 'ArrowDown') {
    selectedIndex.value = (selectedIndex.value + 1) % dataLength;
    while (
      isHideNode(flattedOptions.value[selectedIndex.value]) ||
      flattedOptions.value[selectedIndex.value].optional === false
    ) {
      selectedIndex.value = (selectedIndex.value + 1) % dataLength;
    }
  }
  const targetOption = flattedOptions.value[selectedIndex.value];
  const row = $tree.value?.getRowById(targetOption?.value);
  if (row) {
    $tree.value.setCurrentRow(row);
  }
  document.addEventListener('keydown', (event) => {
    // 检查是否按下了上下左右箭头键
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      headerElement?.blur(); // 使元素失去焦点
    }
  });
  if (event.code === 'Enter' && popperVisible.value && document.activeElement !== headerElement) {
    event.preventDefault();
    if (props.useTree && row && row.children?.length && !row.optional) {
      $tree.value?.toggleTreeExpand(row);
    } else {
      selectOption(targetOption);
    }
  } else if (event.code === 'Enter') {
    curInput.value = '';
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
function onShowPopper() {
  const value = flattedOptions.value?.[0]?.value;
  const row = $tree.value?.getRowById(value);
  if (row) {
    $tree.value.setCurrentRow(row);
  }
}
function onHidePopper() {
  selectedIndex.value = 0;
  $tree.value?.setCurrentRow(null);
  $tree.value?.clearTreeExpand();
  isShowInput.value = false;
  if (isManual) {
    isManual = false;
  }
}
function showPopper() {
  if (popperVisible.value || !_isStringMode.value) {
    return;
  }
  curInput.value = '';
  isShowInput.value = true;
  popperVisible.value = true;
  setTimeout(() => {
    isManual = true;
  });
  nextTick(() => {
    const headerElement = document.querySelector(`.${dynamicClassName} .el-input__inner`);
    headerElement?.focus();
  });
}
function hidePopper() {
  popperVisible.value = false;
  onHidePopper();
}
function hidePopperByClick(event: MouseEvent) {
  const popperElem = document.querySelector(`.${dynamicClassName}`);
  if (!isManual || popperElem?.contains?.(event.target as Node)) {
    return;
  }
  hidePopper();
}
function clear() {
  KScriptInput.value.innerHTML = '';
  textValue.value = '';
  preTextValue = '';
  curInput.value = '';
}
function toggleMode() {
  saveTextValue();
  _isStringMode.value = !_isStringMode.value;
  restoreTextValue();
}

function setStringMode(stringMode: boolean) {
  if (isStringMode()) {
    return;
  }
  saveTextValue();
  _isStringMode.value = stringMode;
  restoreTextValue();
}
function isStringMode() {
  return _isStringMode.value;
}
const caches = {
  expression: '',
  string: ''
};
function saveTextValue() {
  if (!isStringMode()) {
    caches['expression'] = textValue.value;
  } else {
    caches['string'] = textValue.value;
  }
}
function restoreTextValue() {
  clear();
  if (isStringMode()) {
    textValue.value = caches['string'] ?? '';
  } else {
    textValue.value = caches['expression'] ?? '';
  }
  KScriptInput.value.innerHTML = textValue.value;
  const res = parseText() ?? '';
  cacheRes = res;
  emits('update:modelValue', res);
  emits('change', res);
}

defineExpose({
  clear,
  showPopper,
  hidePopper,
  toggleMode,
  setStringMode,
  isStringMode
});
</script>
<style lang="less">
@import './style.less';
</style>
