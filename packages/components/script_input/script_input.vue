<template>
  <div ref="KScriptInputWrapper" class="k-script-input-wrapper box-border">
    <k-popover
      :width="popoverWidth"
      :show-arrow="false"
      :visible="popperVisible"
      :popper-class="`k-script-input-popper ${dynamicClassName}`"
      class="overflow-hidden"
      @show="onShowPopper"
      @hide="onHidePopper"
    >
      <template #reference>
        <div class="flex flex-col w-full min-h-8">
          <div class="flex w-full min-h-8">
            <div class="k-script-input-prepend">
              <k-button v-if="showModeSwitch" @click="toggleMode">
                <component
                  :is="!_isStringMode ? 'IconModeExpressionColor' : 'IconModeExpression'"
                  color="var(--k-gray-400)"
                />
              </k-button>
              <slot name="prepend"></slot>
            </div>
            <div v-if="!showPassword" class="k-script-input-wrap flex-1">
              <div
                ref="KScriptInput"
                :class="[
                  'k-script-input',
                  _styleModule,
                  {
                    'no-checkVariableName ': checkVariableNameResult === false,
                  },
                ]"
                :style="{
                  height: height,
                  resize: resize ? 'vertical' : 'none',
                }"
                contenteditable="plaintext-only"
                :spellcheck="false"
                @input="handleInput"
                @blur="handleBlur"
                @focus="handleFocus"
                @compositionstart="
                  () => {
                    allowInput = false;
                  }
                "
                @compositionend="
                  (e: CompositionEvent) => {
                    allowInput = true;
                    handleInput(e);
                  }
                "
              ></div>
            </div>
            <k-input
              v-else
              ref="KScriptInputPassword"
              v-model="pwd"
              type="password"
              :class="['k-script-input', _styleModule]"
              class="showPassword !h-8 z-10 !p-0 flex-1"
              show-password
              @input="updateModelValue"
              @focus="handleFocus"
              @blur="handleBlur"
            ></k-input>
            <div class="k-script-input-append">
              <slot name="append"></slot>
              <k-button v-if="showPopperSwitch" @click="showPopper">
                <IconVariable />
              </k-button>
            </div>
          </div>
          <div
            v-if="checkVariableNameResult === false"
            v-ksw_tooltip="
              '1.名称只能是中文、英文、数字和下划线。<br/>2.名称不能以数字开头。<br>3.名称不能仅由下划线和数字组成。'
            "
            class="k-script-input-check-result ml-2 text-red-500 text-xs mt-1 flex items-center gap-0.5 w-fit"
          >
            <component is="IconStatusWarning" />
            请按照变量规则命名
          </div>
        </div>
      </template>
      <div>
        <el-scrollbar>
          <k-tree-table
            v-if="allowShowTree"
            id="k-script-input-tree"
            ref="$tree"
            class="k-script-options-scrollbar"
            :class="{
              'input-tips': !showTreeSearch,
            }"
            border="none"
            height="320px"
            :use-tree="useTree"
            :column="columns"
            :data="options"
            :show-search-input="showTreeSearch"
            :show-filter="false"
            :show-header="false"
            :show-page="false"
            :show-header-tools="showTreeSearch"
            :cell-click-toggle-highlight="false"
            :show-description="false"
            :show-refresh="false"
            :row-config="{
              keyField: getAttrProps().value,
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { ElScrollbar } from 'element-plus';
import { ScriptInputProps, ScriptOptions } from './type';
import Message from '../message';
import { usePassword } from './hooks/use_password';
import { genRandomStr, transformTreeData, getElement } from '../../utils';
import { Row, RowData } from '../tree_table';

type FocusRange = { node: Node | null | undefined; offset: number | undefined };
defineOptions({
  name: 'KScriptInput'
});

const _styleModule = inject('_styleModule', '');

const props = withDefaults(defineProps<ScriptInputProps>(), {
  modelValue: '',
  options: () => [],
  size: 'base',
  useTree: false,
  showModeSwitch: true,
  showPopperSwitch: true,
  expandAll: false,
  defaultMode: 'string',
  onlyOneInput: false,
  resize: true,
  checkVariableName: false
});

const DEFAULT_TREE_CONFIG = {
  parentField: 'pid',
  rowField: getAttrProps().value,
  expandAll: false
};

const emits = defineEmits(['change', 'input', 'focus', 'blur', 'select', 'update:modelValue']);

onMounted(() => {
  document.addEventListener('keydown', toggleSelect);
  document.addEventListener('click', hidePopperByClick);
  window.addEventListener('resize', handleResize);
  handleResize();
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', toggleSelect);
  document.removeEventListener('click', hidePopperByClick);
  window.removeEventListener('resize', handleResize);
});

const focusRange: FocusRange = { node: undefined, offset: 0 };
// 动态类名
const dynamicClassName = `_${genRandomStr(8)}`;
// 列配置
const columns = [{ field: getAttrProps().label, title: '', treeNode: true }];
// ref
const KScriptInput = ref();
const KScriptInputPassword = ref();
const $tree = ref();
const KScriptInputWrapper = ref();
// 当前是否字符串模式
const _isStringMode = ref(props.defaultMode === 'string');
let cacheRes = '';
const curInput = ref('');
const selectedIndex = ref<number>(0);
let isManual = false;
const popperVisible = ref(false);
const allowInput = ref(true);
const allowShowTree = ref(false);
const showTreeSearch = ref(false);
const popoverWidth = ref(0);
// 表达式相关
const funcReg = /fx\((.*?)\)/;
const fxSet = new Set();

//  校验结果
const checkVariableNameResult = ref();

// password
const showPassword = defineModel<boolean | undefined>('showPassword', { default: false });
const pwd = ref(props.modelValue.toString());
const { _methods } = usePassword(showPassword, pwd);

const treeConfig = computed(() => {
  if (!props.useTree) {
    return undefined;
  }
  return Object.assign(DEFAULT_TREE_CONFIG, props.treeConfig || {});
});
const flattedOptions = computed(() => {
  const tableData = $tree.value?.getTableData().fullData ?? [];
  return (
    transformTreeData(tableData, { parentField: getAttrProps().value, children: 'children' }) ?? []
  );
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
    if (!showPassword.value) {
      updateFocusRange();
    }
  },
  { immediate: true }
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
    clearCurrentInput();
    const newModelValue = props.modelValue.toString();
    cacheRes = newModelValue;
    if (showPassword.value) {
      pwd.value = newModelValue;
      return;
    }
    nextTick(() => {
      const innerText = parseModelValue(newModelValue);
      setEditorContent(innerText);
    });
  },
  { immediate: true, deep: true }
);

function updateModelValue(res: string) {
  cacheRes = res;
  emits('update:modelValue', res);
}
function getEditorContent() {
  return formatterEscape(KScriptInput.value.innerHTML);
}
function setEditorContent(value: string) {
  KScriptInput.value.innerHTML = value;
}
function handleInput(event: InputEvent | CompositionEvent) {
  if (!(event.target instanceof HTMLElement) || !allowInput.value) {
    return;
  }
  if (event.data === ' ') {
    clearCurrentInput();
  } else if (event.data === null && curInput.value.length) {
    curInput.value = curInput.value.slice(0, -1);
  } else if (event.data !== null) {
    curInput.value += event.data ?? '';
  }
  const { result = '' } = parseInputValue();
  updateModelValue(result);

  if (props.checkVariableName) {
    const regex = /^(?!\d)(?![_\d]+$)[\u4e00-\u9fa5A-Za-z0-9_]+$/;
    if (regex.test(result)) {
      checkVariableNameResult.value = true;
      regex.test('bbm');
    } else {
      checkVariableNameResult.value = false;
    }
  }
}
function handleFocus() {
  allowShowTree.value = true;
  emits('focus');
}
function handleBlur(event: FocusEvent) {
  if (!(event.target instanceof HTMLElement)) {
    return;
  }
  const popperElem = getElement(`.${dynamicClassName}`);
  if (popperElem && !popperElem.contains(event.relatedTarget as Node)) {
    emits('blur');
    emits('change', parseInputValue());
    allowShowTree.value = false;
    popperVisible.value = false;
  }
}
function cellClick({ row }: { row: Row }) {
  if (row.optional === false) {
    return;
  }
  const rowIndex = flattedOptions.value.findIndex(
    (item) => item[getAttrProps().value] === row[getAttrProps().value]
  );
  selectedIndex.value = rowIndex;
  if (row.children?.length) {
    return;
  }
  selectOption(row);
}
async function selectOption(data: Row | RowData) {
  const key = await handleInputContent(data);
  clearCurrentInput();
  resetCursor(key);
  popperVisible.value = false;
  nextTick(() => {
    const res = parseInputValue();
    updateModelValue(res?.result ?? '');
    emits('select', data);
    emits('change', res);
  });
}
// 将选择的脚本标签转化成dom节点并插入到编辑框中，注意两种选择场景下的差异性
async function handleInputContent(data: Row | RowData) {
  if (showPassword.value) {
    _methods.setPasswordMode(false);
    await nextTick();
  }
  const key = genRandomStr(8);
  const content = _isStringMode.value ?
    generateScriptTag(data[getAttrProps().label], key) :
    data[getAttrProps().value];
  if (props.onlyOneInput) {
    KScriptInput.value.innerHTML = content;
  } else {
    handleManualInput(content);
  }
  return key;
}
function handleManualInput(content: string) {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(content, 'text/html');
  const targetNode = doc.body.firstChild as Node;
  const { node, offset } = focusRange;
  if (!node || offset === undefined) {
    KScriptInput.value.appendChild(targetNode);
    return;
  }
  if (node.nodeType === 3) {
    const textContent = node.textContent ?? '';
    const endIndex = isManual ? offset : offset - curInput.value.length;
    const fontText = document.createTextNode(textContent.slice(0, endIndex));
    const newContent = targetNode;
    const behindText = document.createTextNode(textContent.slice(offset));
    const parentNode = node.parentNode;
    parentNode?.replaceChild(behindText, node);
    parentNode?.insertBefore(newContent, behindText);
    parentNode?.insertBefore(fontText, newContent);
    return;
  }
  const childNodes = node.childNodes ?? [];
  if (childNodes.length === 0 || !childNodes[offset]) {
    node.appendChild(targetNode);
    return;
  }
  if (offset > childNodes.length) {
    return;
  }
  node.insertBefore(targetNode, childNodes[offset]);
}
function parseInputValue() {
  if (showPassword.value) {
    return {
      result: pwd.value,
      scriptTags: [],
      isStringMode: isStringMode()
    };
  }
  if (!isStringMode()) {
    return {
      result: getEditorContent(),
      scriptTags: [],
      isStringMode: false
    };
  }
  let text = '';
  const scriptTags: (ScriptOptions | null)[] = [];
  const domToText = (el: HTMLElement) => {
    if (!el) {
      return;
    }
    const nodes = el.childNodes;
    for (let i = 0; i < nodes.length; i++) {
      const node: HTMLElement = nodes[i] as HTMLElement;
      if (node.nodeType === 3) {
        text += node.textContent ?? '';
      } else if (node.tagName.toUpperCase() === 'DIV' && node.classList.contains('k-script-tag')) {
        const label = node.innerText;
        if (fxSet.has(label)) {
          text += `fx(${label})`;
          scriptTags.push(null);
        } else {
          const targetOption = props.options.find((item) => item[getAttrProps().label] === label);
          const attrName = getScriptKey();
          text += `fx(${targetOption?.[attrName] ?? null})`;
          scriptTags.push(targetOption ?? null);
        }
      } else if (node.tagName.toUpperCase() === 'DIV') {
        domToText(node);
      }
    }
  };
  domToText(KScriptInput.value);
  text = text.replace(/\u00A0/g, ' ');
  emits('input', text);
  return {
    result: text,
    checkVariableNameResult: checkVariableNameResult.value,
    scriptTags,
    isStringMode: true
  };
}
// 解析传入的值
function parseModelValue(value: string) {
  fxSet.clear();
  let originText = value;
  if (!isStringMode()) {
    return originText;
  }
  while (funcReg.test(originText)) {
    const match = originText.match(funcReg);
    if (match?.[0] === undefined || match?.[1] === undefined) {
      break;
    }
    const value = match[1];
    const attrName = getScriptKey();
    const targetOption = props.options.find((item) => item[attrName] === value);
    let label = targetOption?.[getAttrProps().label] ?? '';
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
function generateScriptTag(content: string, key: string, isError: boolean = false) {
  return `<div class="k-script-tag ${isError ? 'is-error' : ''}" data-key="${key}"  contenteditable="false">${content}</div>`;
}
function toggleSelect(event: KeyboardEvent) {
  if (!allowShowTree.value || !popperVisible.value) {
    return;
  }
  const dataLength = flattedOptions.value.length;
  const headerElement = getElement<HTMLInputElement>(`.${dynamicClassName} .el-input__inner`);
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
  const row = $tree.value?.getRowById(targetOption?.[getAttrProps().value]);
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
    clearCurrentInput();
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
  if (window.getSelection === undefined) {
    return;
  }
  const selection = window.getSelection();
  if (key === undefined || key === null) {
    KScriptInput.value.focus();
    selection?.selectAllChildren(KScriptInput.value);
    selection?.collapseToEnd();
  } else {
    const range = document.createRange();
    range.selectNodeContents(KScriptInput.value);
    const { node, offset } = getRange(key);
    range.setStart(node, offset);
    range.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
}
function getRange(key: string) {
  let isFound = false;
  const range = {
    node: KScriptInput.value,
    offset: 0
  };
  const getNodeInfo = (node: HTMLElement) => {
    if (isFound) {
      return;
    }
    const childNodes = node.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      if (isFound) {
        break;
      }
      const childNode = childNodes[i] as HTMLElement;
      if (childNode.parentNode !== range.node) {
        range.node = childNode.parentNode;
        range.offset = i;
      }
      range.offset++;
      const targetKey = childNode?.getAttribute?.('data-key');
      if (targetKey === key) {
        isFound = true;
        break;
      }
      if (
        childNode.nodeType !== 3 &&
        childNode?.tagName?.toUpperCase() === 'DIV' &&
        !childNode?.classList?.contains('k-script-tag')
      ) {
        range.node = childNode;
        range.offset = 0;
        getNodeInfo(childNode);
      }
    }
  };
  getNodeInfo(KScriptInput.value);
  return range as { node: Node; offset: number };
}
function onShowPopper() {
  const value = flattedOptions.value?.[0]?.[getAttrProps().value];
  const row = $tree.value?.getRowById(value);
  if (row) {
    $tree.value.setCurrentRow(row);
  }
}
function onHidePopper() {
  selectedIndex.value = 0;
  $tree.value?.setCurrentRow(null);
  $tree.value?.clearTreeExpand();
  showTreeSearch.value = false;
  if (isManual) {
    isManual = false;
  }
}
function showPopper() {
  showTreeSearch.value = true;
  popperVisible.value = true;
  allowShowTree.value = true;
  if (!showPassword.value) {
    updateFocusRange();
  }
  setTimeout(() => {
    isManual = true;
    clearCurrentInput();
  });
  nextTick(() => {
    const headerElement = getElement<HTMLInputElement>(`.${dynamicClassName} .el-input__inner`);
    headerElement?.focus();
  });
}
function updateFocusRange() {
  const selection = window.getSelection();
  const { focusNode, focusOffset } = selection ?? {};
  if (!selection || !KScriptInput.value.contains(focusNode as Node)) {
    return;
  }
  focusRange.node = focusNode;
  focusRange.offset = focusOffset;
}
function hidePopper() {
  popperVisible.value = false;
  onHidePopper();
}
function hidePopperByClick(event: MouseEvent) {
  const popperElem = getElement(`.${dynamicClassName}`);
  if (!isManual || popperElem?.contains?.(event.target as Node)) {
    return;
  }
  hidePopper();
}
function clearCurrentInput() {
  curInput.value = '';
}
function clear() {
  if (showPassword.value) {
    pwd.value = '';
  } else {
    setEditorContent('');
  }
  clearCurrentInput();
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
  string: ''
};
const tempCaches = {
  expression: '',
  string: ''
};
function saveTextValue() {
  const attrName = isStringMode() ? 'string' : 'expression';
  tempCaches[attrName] = getEditorContent();
}
function restoreTextValue() {
  clear();
  const attrName = isStringMode() ? 'string' : 'expression';
  setEditorContent(caches[attrName]);
  const res = parseInputValue();
  cacheRes = res?.result ?? '';
  caches.expression = tempCaches.expression;
  caches.string = tempCaches.string;
  emits('update:modelValue', res?.result ?? '');
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
function getAttrProps() {
  const defaultConfig = { label: 'label', value: 'value', disabled: 'disabled' };
  const attrProps = Object.assign(defaultConfig, props.props);
  return {
    label: attrProps.label,
    value: attrProps.value,
    disabled: attrProps.disabled
  };
}
function getScriptKey() {
  return props.scriptKey ?? getAttrProps().value;
}

function focus() {
  const instance = showPassword.value ? KScriptInputPassword.value : KScriptInput.value;
  if (!instance) {
    return;
  }
  setTimeout(() => {
    instance?.focus();
  });
}
function blur() {
  const instance = showPassword.value ? KScriptInputPassword.value : KScriptInput.value;
  if (!instance) {
    return;
  }
  setTimeout(() => {
    instance?.blur();
  });
}
defineExpose({
  clear,
  showPopper,
  hidePopper,
  toggleMode,
  setStringMode,
  isStringMode,
  focus,
  blur,
  ..._methods
});
</script>
<style lang="less">
@import './style.less';
</style>
