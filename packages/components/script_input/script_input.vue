template
<template>
  <div ref="KScriptInputWrapper" class="k-script-input-wrapper">
    <div class="k-script-input-prepend">
      <k-button v-if="showModeSwitch" @click="toggleMode">
        <component
          :is="!_isStringMode ? 'IconModeExpressionColor' : 'IconModeExpression'"
          color="var(--k-gray-400)"
        />
      </k-button>
      <slot name="prepend"></slot>
    </div>
    <k-popover
      :width="popoverWidth"
      :show-arrow="false"
      :visible="popperVisible"
      :popper-class="`k-script-input-popper ${dynamicClassName}`"
      @show="onShowPopper"
      @hide="onHidePopper"
      class="overflow-hidden"
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
          @compositionstart="
            () => {
              isAllowInput = false;
            }
          "
          @compositionend="
            (e: CompositionEvent) => {
              isAllowInput = true;
              handleInput(e);
            }
          "
        ></div>
      </template>
      <div>
        <el-scrollbar>
          <k-tree-table
            v-if="showTree"
            id="k-script-input-tree"
            class="mytable-scrollbar"
            ref="$tree"
            border="none"
            height="320px"
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
              ({ row }: any) => {
                if (row.optional === false && !row.children?.length) {
                  return 'k-script-input-tree-disabled';
                }
                return '';
              }
            "
            :tree-config="treeConfig"
            highlight-current
            adaptive
            @cell-click="cellClick"
          ></k-tree-table>
        </el-scrollbar>
      </div>
    </k-popover>
    <div class="k-script-input-append">
      <slot name="append"></slot>
      <k-button v-if="showPopperSwitch" @click="showPopper">
        <IconVariable />
      </k-button>
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
import Message from '../message';
import { genRandomStr, allTreeDataToArray } from '../../utils';
import { Row, RowData } from '../tree_table';

defineOptions({
  name: 'KScriptInput',
});

const _styleModule = inject('_styleModule', '');
const diff = inject<any>('__diffMatchPatch');

const props = withDefaults(defineProps<ScriptInputProps>(), {
  options: () => [],
  size: 'base',
  useTree: false,
  showModeSwitch: true,
  showPopperSwitch: true,
  expandAll: false,
});

const DEFAULT_TREE_CONFIG = {
  parentField: 'pid',
  rowField: 'value',
  expandAll: false,
};

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

// 动态类名
const dynamicClassName = `_${genRandomStr(8)}`;
// 列配置
const columns = [{ field: 'label', label: '', treeNode: true }];
// ref
const KScriptInput = ref();
const $tree = ref();
const KScriptInputWrapper = ref();
// 当前是否字符串模式
const _isStringMode = ref(true);
// @ts-ignore: unknown warning
let preTextValue: string = '';
let cacheRes = '';
const curInput = ref('');
const selectedIndex = ref<number>(0);
let isManual = false;
const popperVisible = ref(false);
const isAllowInput = ref(true);
let canFocus = false;
const showTree = ref(false);
const isShowInput = ref(false);
const popoverWidth = ref(0);
// 表达式相关
const funcReg = /fx\((.*?)\)/;
const fxSet = new Set();

// 监测窗口发生变化后
window.addEventListener('resize', handleResize);

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const treeConfig = computed(() => {
  if (!props.useTree) {
    return undefined;
  }
  return Object.assign(DEFAULT_TREE_CONFIG, props.treeConfig || {});
});
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
  () => [props.modelValue, props.options],
  () => {
    const type = typeof props.modelValue;
    if ((type !== 'string' && type !== 'number') || props.modelValue === undefined) {
      console.warn(`'modelValue' must be a string or number, but got ${type}`);
      return;
    }
    if (props.modelValue === cacheRes) {
      return;
    }
    // const innerText = parseModelValue(props.modelValue.toString());
    // setEditorContent(innerText);
    // cacheRes = props.modelValue.toString();
    nextTick(() => {
      const innerText = parseModelValue(props.modelValue.toString());
      setEditorContent(innerText);
      cacheRes = props.modelValue.toString();
      preTextValue = getEditorContent();
      tempText = preTextValue;
      resetCursor();
    });
  },
  { immediate: true, deep: true },
);

function updateModelValue() {
  const res = parseInputValue();
  cacheRes = res;
  emits('update:modelValue', res);
}
function getEditorContent() {
  return formatterEscape(KScriptInput.value.innerHTML);
}
function setEditorContent(value: string) {
  KScriptInput.value.innerHTML = value;
}
let tempText = '';
function handleInput(event: InputEvent | CompositionEvent) {
  if (!(event.target instanceof HTMLElement) || !isAllowInput.value) {
    return;
  }
  if (event.data === ' ') {
    curInput.value = '';
  } else if (event.data === null && curInput.value.length) {
    curInput.value = curInput.value.slice(0, -1);
  } else if (event.data !== null) {
    curInput.value += event.data ?? '';
  }
  preTextValue = tempText;
  tempText = getEditorContent();
  updateModelValue();
}
function handleFocus() {
  showTree.value = true;
  canFocus = true;
  emits('focus');
}
function handleBlur(event: FocusEvent) {
  if (!(event.target instanceof HTMLElement)) {
    return;
  }
  const popperElem = getElement(`.${dynamicClassName}`);
  if (popperElem && !popperElem.contains(event.relatedTarget as Node)) {
    canFocus = false;
    emits('blur');
    emits('change', parseInputValue());
    showTree.value = false;
    popperVisible.value = false;
  }
}
function cellClick({ row }: { row: Row }) {
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
function selectOption(data: Row | RowData) {
  const { value, key } = handleInputContent(data);
  curInput.value = '';
  setEditorContent(value);
  preTextValue = getEditorContent();
  tempText = preTextValue;
  resetCursor(key);
  emits('select', data);
  popperVisible.value = false;
  nextTick(() => {
    updateModelValue();
    emits('change', parseInputValue());
  });
}
function handleInputContent(data: Row | RowData) {
  const key = genRandomStr(8);
  const content = _isStringMode.value ? generateScriptTag(data.label, key) : data.value;
  if (isManual) {
    return {
      value: getEditorContent() + content,
      key,
    };
  }
  const diffText = diff.diff_main(preTextValue, getEditorContent());
  let replaceText = '';
  const firstSameObj = diffText.find((diff: [number, string]) => diff[0] === 0);
  const firstSameText = firstSameObj?.[1] ?? '';
  const [firstDiffIndex, firstDiffText] = diffText.find(
    (diff: [number, string]) => diff[0] !== 0,
  ) ?? [-2, ''];
  if (firstDiffIndex === 1) {
    replaceText = (firstSameText + firstDiffText).slice(0, -curInput.value.length);
  } else if (firstDiffIndex === -1) {
    replaceText = firstSameText.slice(0, -curInput.value.length);
  } else {
    replaceText = firstSameText;
  }
  let validText = '';
  if (firstSameObj) {
    firstSameObj[1] = `${replaceText}${content}`;
    validText = diffText
      .filter((diff: [number, string]) => diff[0] === 0)
      .map((diff: [number, string]) => diff[1])
      .join('');
  } else {
    validText = content;
  }

  return {
    value: validText,
    key,
  };
}
function parseInputValue() {
  if (!isStringMode()) {
    return getEditorContent();
  }
  let text = '';
  const nodes = KScriptInput.value.childNodes;
  for (let i = 0; i < nodes.length; i++) {
    const node: HTMLElement = nodes[i];
    if (node.nodeType === 3) {
      text += node.textContent ?? '';
    } else if (node.tagName.toUpperCase() === 'DIV' && node.classList.contains('k-script-tag')) {
      const label = node.innerText;
      if (fxSet.has(label)) {
        text += `fx(${label})`;
      } else {
        const targetOption = props.options.find((item) => item.label === label);
        text += `fx(${targetOption?.value ?? null})`;
      }
    }
  }
  text = text
    .split(' ')
    .filter((item) => item !== '')
    .join(' ');
  const res = formatter(text);
  emits('input', res);
  return res;
}
// 解析传入的值
function parseModelValue(value: string) {
  fxSet.clear();
  let originText = value.replace(/''/g, "'");
  if (!isStringMode()) {
    return originText;
  }
  originText = unFormatter(originText);
  while (funcReg.test(originText)) {
    const match = originText.match(funcReg);
    if (match?.[0] === undefined || match?.[1] === undefined) {
      break;
    }
    const value = match[1];
    const targetOption = props.options.find((item) => item.value === value);
    let label = targetOption?.label ?? '';
    let isError = false;
    if (!targetOption) {
      label = value;
      Message.error(`'${value}' not found`);
      fxSet.add(label);
      isError = true;
    }
    const key = genRandomStr(8);
    originText = originText.replace(match?.[0], generateScriptTag(label, key, isError));
  }
  return originText;
}
function formatter(str: string) {
  const reg = /fx\((.*?)\)/;
  str = str.replace(/'/g, "''");
  if (!_isStringMode.value) {
    return str;
  }
  let newStr = '';
  while (reg.test(str)) {
    const match = str.match(reg)?.[0] ?? '';
    const index = str.indexOf(match);
    const targetText = str.slice(0, index);
    if (targetText?.trim()?.length) {
      newStr += ` '${targetText?.trim()}' `;
    }
    newStr += ` ${match} `;
    str = str.slice(index + match.length);
  }
  if (str?.length) {
    newStr += `'${str}'`;
  }
  return newStr.trim();
}
function unFormatter(str: string) {
  const strArr = str.split("''");
  strArr.forEach((item, index) => {
    strArr[index] = item.replace(/'/g, '');
  });
  return strArr.join("'");
}
function generateScriptTag(content: string, key: string, isError: boolean = false) {
  return `<div class="k-script-tag ${isError ? 'is-error' : ''}" data-key="${key}"  contenteditable="false">${content}</div>`;
}
function toggleSelect(event: KeyboardEvent) {
  const dataLength = flattedOptions.value.length;
  const headerElement = getElement(`.${dynamicClassName} .el-input__inner`);
  // 为了防止事件冲突，使用方向键选择脚本时，脚本搜索输入框应失去焦点
  if (event.code === 'ArrowUp') {
    headerElement?.blur();
    selectedIndex.value = (selectedIndex.value - 1 + dataLength) % dataLength;
    while (
      isHideNode(flattedOptions.value[selectedIndex.value]) ||
      flattedOptions.value[selectedIndex.value].optional === false
    ) {
      selectedIndex.value = (selectedIndex.value - 1 + dataLength) % dataLength;
    }
  } else if (event.code === 'ArrowDown') {
    headerElement?.blur();
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

function isHideNode(rowData: RowData) {
  const parentRow = $tree.value?.getRowById(rowData?.pid);
  if (!parentRow) {
    return false;
  }
  return Boolean(!$tree.value?.isTreeExpandByRow(parentRow) && rowData.pid);
}
// 解决输入非字符内容时光标无法移到最后的问题
function resetCursor(key?: string) {
  if (!canFocus || window.getSelection === undefined) {
    return;
  }
  const selection = window.getSelection();
  if (key === undefined) {
    KScriptInput.value.focus();
    selection?.selectAllChildren(KScriptInput.value);
    selection?.collapseToEnd();
  } else {
    const range = document.createRange();
    range.selectNodeContents(KScriptInput.value);
    range.setStart(KScriptInput.value, getDomIndex(key));
    range.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
}
function getDomIndex(key: string) {
  if (!key) {
    return -1;
  }
  const childNodes: HTMLElement[] = Array.from(KScriptInput.value?.childNodes ?? []);
  let index = 0;
  for (let i = 0; i < childNodes.length; i++) {
    index++;
    const targetKey = childNodes[i]?.getAttribute?.('data-key');
    if (targetKey === key) {
      break;
    }
  }
  return index;
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
  showTree.value = true;
  setTimeout(() => {
    isManual = true;
  });
  nextTick(() => {
    const headerElement = getElement(`.${dynamicClassName} .el-input__inner`);
    headerElement?.focus();
  });
}
function getElement(selector: string): HTMLInputElement | null {
  return document.querySelector(selector);
}
function hidePopper() {
  popperVisible.value = false;
  showTree.value = false;
  onHidePopper();
}
function hidePopperByClick(event: MouseEvent) {
  const popperElem = getElement(`.${dynamicClassName}`);
  if (!isManual || popperElem?.contains?.(event.target as Node)) {
    return;
  }
  hidePopper();
}
function clear() {
  setEditorContent('');
  preTextValue = '';
  curInput.value = '';
}
function toggleMode() {
  saveTextValue();
  _isStringMode.value = !_isStringMode.value;
  restoreTextValue();
}

function setStringMode(stringMode: boolean) {
  if (isStringMode() === stringMode) {
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
  string: '',
};
const tempCaches = {
  expression: '',
  string: '',
};
function saveTextValue() {
  const attrName = isStringMode() ? 'string' : 'expression';
  tempCaches[attrName] = getEditorContent();
}
function restoreTextValue() {
  clear();
  const attrName = isStringMode() ? 'string' : 'expression';
  setEditorContent(caches[attrName]);
  const res = parseInputValue() ?? '';
  cacheRes = res;
  caches.expression = tempCaches.expression;
  caches.string = tempCaches.string;
  emits('update:modelValue', res);
  emits('change', res);
}
function handleResize() {
  nextTick(() => {
    // 获取 KScriptInputWrapper 的 宽度
    popoverWidth.value = KScriptInputWrapper.value?.offsetWidth ?? 0;
  });
}
function formatterEscape(str: string) {
  return str.replace(/&nbsp;/g, ' ');
}
defineExpose({
  clear,
  showPopper,
  hidePopper,
  toggleMode,
  setStringMode,
  isStringMode,
});
</script>
<style lang="less">
@import './style.less';
</style>
