<template>
  <div class="k-script-input-wrapper" ref="KScriptInputWrapper">
    <div class="k-script-input-prepend">
      <slot name="prepend"></slot>
    </div>
    <k-popover
      :width="popoverWidth"
      :show-arrow="false"
      :visible="popperVisible"
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
      textValue.value = props.modelValue.toString();
      preTextValue = textValue.value;
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
  textValue.value = KScriptInput.value.innerHTML;
}
function handleFocus() {
  emits('focus');
}
function handleBlur() {
  if (preTextValue !== textValue.value) {
    preTextValue = textValue.value;
    parseText();
  }
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
  let endIndex = curInput.value.length ? -curInput.value.length : undefined;
  textValue.value = textValue.value.slice(0, endIndex);
  curInput.value = '';
  textValue.value += generateScriptTag(data.label);
  preTextValue = textValue.value;
  KScriptInput.value.innerHTML = textValue.value;
  cursorToEnd();
  emits('select', data);
  popperVisible.value = false;
}
function parseText() {
  let text = textValue.value;
  const replaceReg = /<div[^>]*>(.*?)<\/div>/;
  while (replaceReg.test(text)) {
    const regex = />([\s\S]*?)<\/div>/;
    const label = text.match(regex)?.[1] ?? '';
    text = text.replace(replaceReg, `${prefix}-${label}&nbsp;`);
  }
  const res = text
    .split(/&nbsp;| /g)
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
  const finalRes = encapsulateAndEscapeFx(res);
  emits('change', finalRes);
  return finalRes;
}
function encapsulateAndEscapeFx(input: string): string {
  const regex = /fx\((.*?)\)/g;
  let lastEnd = 0;
  let result: string[] = [];
  input.replace(regex, (match, group, offset) => {
    const beforeText = input.slice(lastEnd, offset).trim();
    if (beforeText) {
      result.push(`'${beforeText.replace(/'/g, "''")}'`);
    }
    result.push(match);
    lastEnd = offset + match.length;
    return match; // 继续替换
  });
  if (lastEnd < input.length) {
    const remainingText = input.slice(lastEnd).trim();
    if (remainingText) {
      result.push(`'${remainingText.replace(/'/g, "''")}'`);
    }
  }
  return result.join('');
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
      headerElement.blur(); // 使元素失去焦点
    }
  });
  if (event.code === 'Enter' && popperVisible.value && document.activeElement !== headerElement) {
    event.preventDefault();
    if (props.useTree && row && row.children?.length && !row.optional) {
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
  if (popperVisible.value) {
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
    headerElement.focus();
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

defineExpose({
  clear,
  showPopper,
  hidePopper,
});
</script>
<style lang="less">
@import './style.less';
</style>
