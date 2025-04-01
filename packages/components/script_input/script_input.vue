<template>
  <div ref="KScriptInput" class="k-script-input box-border" :class="{ 'is-disabled': disabled }">
    <k-popover
      :width="popoverWidth"
      :show-arrow="false"
      :visible="popperVisible"
      :popper-class="`k-script-input-popper ${dynamicClassName}`"
      :teleported
      class="overflow-hidden"
      @hide="onHidePopper"
    >
      <template #reference>
        <div class="flex flex-col w-full min-h-8">
          <div class="flex w-full min-h-8 relative">
            <div class="k-script-input-prepend">
              <k-button
                v-if="showModeSwitch"
                v-ksw_tooltip="_isStringMode ? t?.('scriptInput.stringMode') : t?.('scriptInput.expressionMode')"
                :disabled
                @click="
                  () => {
                    toggleMode();
                    emits('mode-change', isStringMode() ? 'string' : 'expression');
                  }
                "
              >
                <component
                  :is="!_isStringMode ? 'IconModeExpressionColor' : 'IconModeExpression'"
                  color="var(--k-gray-400)"
                />
              </k-button>
              <slot name="prepend"></slot>
            </div>
            <div v-if="!_showPassword" class="k-script-input-wrap flex-1">
              <div
                ref="KScriptInputWrapper"
                :class="[
                  'k-script-input-wrapper',
                  {
                    'k-script-input-placeholder': true,
                    'hidden-result ': showMessage === true,
                    'is-disabled': disabled,
                    'k-script-tag--closable': tagClosable
                  }
                ]"
                :style="{
                  maxHeight: maxHeight,
                  resize: resize ? 'vertical' : 'none'
                }"
                :contenteditable="disabled || !editable ? false : 'plaintext-only'"
                :spellcheck="false"
                :placeholder="placeholder ?? t?.('scriptInput.placeholder')"
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
              :disabled
              class="k-script-input-wrapper showPassword !h-8 z-10 !p-0 flex-1"
              :placeholder="placeholder ?? t?.('scriptInput.placeholder')"
              show-password
              @input="updateModelValue"
              @focus="handleFocus"
              @blur="handleBlur"
            ></k-input>
            <div class="k-script-input-append">
              <slot name="append"></slot>
              <k-button v-if="showPopperSwitch" :disabled @click="showPopper">
                <IconVariable />
              </k-button>
            </div>
            <div
              v-if="showMessage"
              v-ksw_tooltip="VTooltipConfig"
              class="k-script-input-check-result text-red-500 text-xs flex items-center gap-0.5 w-fit"
            >
              <component :is="'IconStatusWarning'" />
              {{ resultMessage }}
            </div>
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
              'input-tips': !showTreeSearch
            }"
            border="none"
            height="320px"
            :use-tree="useTree"
            :column="columns"
            :data="tableData"
            :show-search-input="showTreeSearch"
            :show-filter="false"
            :show-header="false"
            :show-page="false"
            :show-header-tools="showTreeSearch"
            :cell-click-toggle-highlight="false"
            :show-description="false"
            :show-refresh="false"
            :row-config="{
              keyField: '__kid__',
              isCurrent: true,
              currentMethod: ({ row }) => {
                return row.optional !== false;
              }
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
            :search-config="searchConfig"
            highlight-current
            adaptive
            @cell-click="cellClick"
          >
            <template #[getAttrProps().optionLabel]="data">
              <slot name="option" v-bind="data">{{ data?.row[getAttrProps().optionLabel] }}</slot>
            </template>
          </k-tree-table>
        </el-scrollbar>
      </div>
    </k-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { ElScrollbar } from 'element-plus';
import { ScriptInputProps, ScriptOptions, ChangeEventParams, ScriptTagConfig } from './type';
import Message from '../message';
import { usePassword } from './hooks/use_password';
import { genRandomStr, transformTreeData, getElement } from '../../utils';
import { useLocale } from '../../hooks';
import { Row, RowData } from '../tree_table';
import { checkInputMessage, typeRules } from './const';

type FocusRange = { node: Node | null | undefined; offset: number | undefined };
defineOptions({
  name: 'KScriptInput'
});

const { t } = useLocale();

const props = withDefaults(defineProps<ScriptInputProps>(), {
  modelValue: '',
  options: () => [],
  size: 'base',
  useTree: false,
  disabled: false,
  showModeSwitch: true,
  showPopperSwitch: true,
  defaultMode: 'string',
  onlyOneInput: false,
  resize: true,
  checkContentType: false,
  contentType: 'string',
  optionRepeatable: true,
  tagClosable: false,
  teleported: true
});

const DEFAULT_TREE_CONFIG = {
  parentField: 'pid',
  rowField: getAttrProps().value,
  expandAll: false,
  trigger: 'default'
};

const emits = defineEmits([
  'change',
  'input',
  'focus',
  'blur',
  'select',
  'update:modelValue',
  'mode-change'
]);

onMounted(() => {
  document.addEventListener('keydown', toggleSelect);
  document.addEventListener('click', handlePageClick);
  window.addEventListener('resize', handleResize);
  handleResize();
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', toggleSelect);
  document.removeEventListener('click', handlePageClick);
  window.removeEventListener('resize', handleResize);
});

const focusRange: FocusRange = { node: undefined, offset: 0 };
// 动态类名
const dynamicClassName = `_${genRandomStr(8)}`;
// 列配置
const columns = [{ field: getAttrProps().optionLabel, title: '', treeNode: true }];
// ref
const KScriptInput = ref();
const KScriptInputWrapper = ref();
const KScriptInputPassword = ref();
const $tree = ref();
// 当前是否字符串模式
const _isStringMode = ref(props.defaultMode !== 'expression');
let cacheRes = '';
const curInput = ref('');
const selectedIndex = ref<number>(-1);
let isManual = false;
let contentHasChanged = false;
const popperVisible = ref(false);
const allowInput = ref(true);
const allowShowTree = ref(false);
const showTreeSearch = ref(false);
const popoverWidth = ref(0);
// 是否可编辑
const editable = ref(true);
// 表达式相关
const funcReg = /fx\((.*?)\)|RPA_Func\{\{(.*?)\}\}/;
const fxSet = new Set();

//  校验结果
const showMessage = ref(false);
let checkVariableResult = true;
const resultMessage = ref('');
const limitMaxMinMsg = ref('');

// password
const _showPassword = ref(false);
const pwd = ref(props.modelValue.toString());
const { _methods } = usePassword(_showPassword, pwd);

// 下拉列表配置
const treeConfig = computed(() => {
  if (!props.useTree) {
    return undefined;
  }
  return Object.assign(DEFAULT_TREE_CONFIG, props.treeConfig || {});
});

// tree => array
const flattedOptions = computed(() => {
  const tableData = $tree.value?.getTableData().fullData ?? [];
  return (
    transformTreeData(tableData, { parentField: getAttrProps().value, children: 'children' }) ?? []
  );
});

// tooltip配置
const VTooltipConfig = computed(() => ({
  content: checkInputMessage.tooltip,
  visible:
    showMessage.value &&
    props.contentType !== 'number' &&
    props.contentType !== 'boolean' &&
    !limitMaxMinMsg.value
}));

const isOnlyOneInput = computed(() => {
  const isOnly = props.onlyOneInput;
  const curMode = isStringMode() ? 'string': 'expression'; 
  if (isOnly === true || (Array.isArray(isOnly) && isOnly.includes(curMode))) {
    return true;
  }
  return false;
});

const tableData = computed<ScriptOptions[]>(() => {
  return props.options.map((item: RowData) => {
    item.__kid__ = item[getAttrProps().value];
    return item;
  });
});

watch(
  () => props.height,
  async () => {
    await nextTick();
    const scriptInstance = KScriptInput.value;
    if (scriptInstance?.style?.height) {
      scriptInstance.style.height = props.height ?? 'auto';
    }
  },
  { immediate: true }
);
// 输入框内容发生变化时，需要更新下拉列表的显示状态以及光标位置
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
    if (!_showPassword.value) {
      updateFocusRange();
    }
  },
  { immediate: true }
);
watch(
  () => props.showPassword,
  (newVal: boolean) => {
    _methods.setPasswordMode(newVal);
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
    const modelValue = props.modelValue.toString();
    if (_showPassword.value && !funcReg.test(modelValue)) {
      pwd.value = modelValue;
      return;
    } else {
      _showPassword.value = false;
    }
    const newModelValue = escapeValue(modelValue);
    cacheRes = newModelValue;
    editable.value = !(isOnlyOneInput.value &&( newModelValue.includes('fx(') || newModelValue.includes('RPA_Func{{')));
    nextTick(() => {
      const innerText = parseModelValue(newModelValue);
      setEditorContent(innerText);
    });
  },
  { immediate: true, deep: true }
);
watch(
  () => props.contentType,
  () => {
    const { result = '' } = parseInputValue();
    checkInputContentType(result);
  }
);

// 更新v-model绑定值
function updateModelValue(res: string) {
  cacheRes = res;
  contentHasChanged = true;
  emits('update:modelValue', res);
  editable.value = !(isOnlyOneInput.value &&( res.includes('fx(') || res.includes('RPA_Func{{')));
}

// 处理change事件
function handleChange(res: ChangeEventParams) {
 if (contentHasChanged) {
  emits('change', res);
  contentHasChanged = false;
 }
}

// 获取输入框内容，注意处理特殊字符
function getEditorContent(isText: boolean = false) {
  const { innerHTML, textContent } = KScriptInputWrapper.value;
  const content = isText? textContent : innerHTML;
  return content.replace(/&nbsp;/g, ' ');
}

// 设置输入框内容
function setEditorContent(value: string) {
  KScriptInputWrapper.value.innerHTML = value;
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
  if (!result?.length) {
    setEditorContent('');
  }
  updateModelValue(result);
  checkInputContentType(result);
}

function checkInputContentType(result: string) {
  limitMaxMinMsg.value = '';
  if (!props.checkContentType) {
    return;
  }
  const typeInfo = typeRules.has(props.contentType)
    ? typeRules.get(props.contentType)
    : typeRules.get('string');

  if (typeInfo?.reg.test(result)) {
    showMessage.value = false;
    checkVariableResult = true;
  } else {
    resultMessage.value = typeInfo?.message ?? '';
    showMessage.value = true;
    checkVariableResult = false;
  }

  // 此处校验结果展示需要基于外部动态拼接
  limitMaxMinMsg.value = isInRange(result) as string;

  if (limitMaxMinMsg.value) {
    showMessage.value = true;
    resultMessage.value = `${limitMaxMinMsg.value}`;
  }
}

function isInRange(value: string) {
  if (typeof props.max !== 'number' || typeof props.min !== 'number' || props.max < props.min) {
    return;
  }

  const newValue = props.contentType === 'number' ? Number(value) : value.length;
  const prefix = props.contentType === 'number' ? '数值范围' : '字符长度';

  if (props.min && Number.isInteger(props.min) && newValue < props.min) {
    return `${prefix}必须大于等于 ${props.min} `;
  }
  if (props.max && Number.isInteger(props.max) && newValue > props.max) {
    return `${prefix}必须小于等于 ${props.max} `;
  }
}

function handleFocus(event: FocusEvent) {
  allowShowTree.value = true;
  emits('focus', event);
}

function handleBlur(event: FocusEvent) {
  if (!(event.target instanceof HTMLElement)) {
    return;
  }
  const popperElem = getElement(`.${dynamicClassName}`);
  if (popperElem && !popperElem.contains(event.relatedTarget as Node)) {
    emits('blur', event);
    handleChange(parseInputValue());
    allowShowTree.value = false;
    popperVisible.value = false;
  }
}

function cellClick({ row }: { row: Row }) {
  if (row.children?.length && !row.optional) {
    return;
  }
  const rowIndex = flattedOptions.value.findIndex(
    (item) => item[getAttrProps().value] === row[getAttrProps().value]
  );
  selectedIndex.value = rowIndex;
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
    handleChange(res)
  });
}

// 将选择的脚本标签转化成dom节点并插入到编辑框中，注意两种选择场景下的差异性
async function handleInputContent(data: Row | RowData) {
  if (_showPassword.value) {
    _methods.setPasswordMode(false);
    await nextTick();
  }
  const key = genRandomStr(8);
  const content = getInputContent(data, key);
  if (isOnlyOneInput.value) {
    KScriptInputWrapper.value.innerHTML = content;
  } else {
    handleManualInput(content);
  }
  return key;
}

function getInputContent(data: Row | RowData, key: string) {
  const label = data[getAttrProps().label];
  const value = data[getAttrProps().value];
  if (_isStringMode.value && data?.isFunction) {
    return generateScriptTag(value, { key, isFunction: true })
  } else if (_isStringMode.value && data[getAttrProps().tag] !== false) {
    return generateScriptTag(label, { key })
  } else {
    return value;
  }
}

function handleManualInput(content: string) {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(content, 'text/html');
  const targetNode = doc.body.firstChild as Node;
  const { node, offset } = focusRange;
  if (!props.optionRepeatable && targetNode?.nodeType === 1) {
    removeSameNode(targetNode as Element);
  }
  if (!node || offset === undefined) {
    KScriptInputWrapper.value.appendChild(targetNode);
    return;
  }
  if (node.nodeType === 3) {
    const textContent = node.textContent ?? '';
    const endIndex = isManual ? offset : offset - curInput.value.length;
    const fontText = textContent.slice(0, endIndex);
    const behindText = textContent.slice(offset);
    const parentNode = node.parentNode;
    if (!behindText?.length) {
      parentNode?.replaceChild(targetNode, node);
    } else {
      const behindTextNode = document.createTextNode(behindText);
      parentNode?.replaceChild(behindTextNode, node);
      parentNode?.insertBefore(targetNode, behindTextNode);
    }
    if (fontText?.length) {
      parentNode?.insertBefore(document.createTextNode(fontText), targetNode);
    }
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

function removeSameNode(targetNode: Element) {
  const dataValue = targetNode.getAttribute('data-value');
  const sameNodes = Array.from(
    KScriptInputWrapper.value.querySelectorAll(`[data-value="${dataValue}"]`)
  );
  sameNodes.forEach((node) => {
    KScriptInputWrapper.value.removeChild(node);
  });
}

function parseInputValue(): ChangeEventParams {
  if (_showPassword.value || !isStringMode()) {
    return {
      result: _showPassword.value ? pwd.value : getEditorContent(true),
      scriptTags: [],
      isStringMode: isStringMode(),
      checkVariableResult
    };
  }
  let text = '';
  const scriptTags: (ScriptOptions | null)[] = [];
  const domToText = (el: HTMLElement) => {
    if (!el) {
      return {};
    }
    const nodes = el.childNodes;
    for (let i = 0; i < nodes.length; i++) {
      const node: HTMLElement = nodes[i] as HTMLElement;
      if (node.nodeType === 3) {
        text += node.textContent ?? '';
      } else if (node.tagName.toUpperCase() === 'DIV' && node.classList.contains('k-script-tag')) {
        const label = node.innerText;
        const dataType = node.getAttribute('data-type');
        if (dataType === 'function') {
          text += `RPA_Func{{${label}}}`;
        } else if (fxSet.has(label)) {
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
  domToText(KScriptInputWrapper.value);
  // 处理网页空格
  text = text.replace(/\u00A0/g, ' ');
  // 处理尾随换行符
  if (text.length && text[text.length - 1].charCodeAt(0) === 10) {
    text = text.slice(0, -1);
  }
  // 注意密码框的特殊处理
  toPwdMode(text);
  emits('input', text);
  return {
    result: text,
    checkVariableResult,
    scriptTags,
    isStringMode: true
  };
}

function toPwdMode(text: string) {
  if (!text?.length && props.showPassword && !_showPassword.value) {
    _methods.setPasswordMode(true);
    nextTick(() => {
      KScriptInputPassword.value?.focus?.();
    });
  }
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
    const matchRegStr = match?.[0];
    const matchStr = match?.[1] ?? match?.[2];
    if (!match || matchRegStr === undefined || !matchStr === undefined) {
      break;
    }
    const tagConfig = { key: genRandomStr(8), isError: false, isFunction: false }
    const value = match[1] ?? match[2];
    const attrName = getScriptKey();
    const targetOption = props.options.find((item) => item[attrName] === value);
    let label = targetOption?.[getAttrProps().label] ?? '';
    if (match[0].includes('RPA_Func{{')) {
      label = value;
      tagConfig.isFunction = true;
    } else if (!targetOption) {
      label = value;
      Message.error(`'${value}' not found`);
      fxSet.add(label);
      tagConfig.isError = true;
    }
    originText = originText.replace(match?.[0], generateScriptTag(label, tagConfig));
  }
  return originText;
}

function generateScriptTag(content: string, config: ScriptTagConfig) {
  const { key = '', isError = false, isFunction = false } = config;
  const dataType = isFunction ? 'function' : 'variable';
  return `<div class="k-script-tag ${
    isError ? 'is-error' : ''
  }" data-key="${key}" data-value="${content}" data-type="${dataType}" contenteditable="false">${content}<span class="k-script-tag-clear-mark"></span></div>`;
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
  if (
    event.code === 'Enter' &&
    popperVisible.value &&
    document.activeElement !== headerElement &&
    selectedIndex.value >= 0
  ) {
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
    KScriptInputWrapper.value.focus();
    selection?.selectAllChildren(KScriptInputWrapper.value);
    selection?.collapseToEnd();
  } else {
    const range = document.createRange();
    range.selectNodeContents(KScriptInputWrapper.value);
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
    node: KScriptInputWrapper.value,
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
  getNodeInfo(KScriptInputWrapper.value);
  return range as { node: Node; offset: number };
}

function onHidePopper() {
  selectedIndex.value = -1;
  $tree.value?.setCurrentRow(null);
  $tree.value?.clearTreeExpand();
  showTreeSearch.value = false;
  if (isManual) {
    isManual = false;
  }
}

function showPopper() {
  if (props.disabled) {
    return;
  }
  showTreeSearch.value = true;
  popperVisible.value = true;
  allowShowTree.value = true;
  if (!_showPassword.value) {
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
  if (!selection || !KScriptInputWrapper.value.contains(focusNode as Node)) {
    return;
  }
  focusRange.node = focusNode;
  focusRange.offset = focusOffset;
}

function hidePopper() {
  popperVisible.value = false;
  onHidePopper();
}

function handlePageClick(e: MouseEvent) {
  hidePopperByClick(e);
  removeTag(e);
}

function hidePopperByClick(event: MouseEvent) {
  const popperElem = getElement(`.${dynamicClassName}`);
  if (!isManual || popperElem?.contains?.(event.target as Node)) {
    return;
  }
  hidePopper();
}

function removeTag(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target?.classList?.contains?.('k-script-tag-clear-mark')) {
    return;
  }
  const tag = target.parentNode;
  if (tag) {
    tag.parentNode?.removeChild(tag);
  }
  const res = parseInputValue();
  updateModelValue(res?.result ?? '');
  handleChange(res);
}

function clearCurrentInput() {
  curInput.value = '';
}

function clear() {
  if (_showPassword.value) {
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

function setCurrentMode(mode: 'password' | 'string' | 'expression') {
  if (mode === 'password') {
    _methods.setPasswordMode(true);
  } else if (mode === 'string') {
    setStringMode(true);
  } else {
    setStringMode(false);
  }
}

function getCurrentMode() {
  if (_showPassword.value) {
    return 'password';
  }
  return isStringMode() ? 'string' : 'expression';
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
  if (_showPassword.value) {
    return;
  }
  const attrName = isStringMode() ? 'string' : 'expression';
  tempCaches[attrName] = getEditorContent();
}

function restoreTextValue() {
  if (_showPassword.value) {
    return;
  }
  clear();
  const attrName = isStringMode() ? 'string' : 'expression';
  setEditorContent(caches[attrName]);
  const res = parseInputValue();
  caches.expression = tempCaches.expression;
  caches.string = tempCaches.string;
  updateModelValue(res.result ?? '');
  handleChange(res);
}

function handleResize() {
  nextTick(() => {
    // 获取 KScriptInput 的 宽度
    popoverWidth.value = KScriptInput.value?.offsetWidth ?? 0;
  });
}

function escapeValue(str: string) {
  if (typeof str !== 'string') {
    return str;
  }
  return str.replace(/<|>/g, (match) => {
    if (match === '<') {
      return '&lt;';
    } else {
      return '&gt;';
    }
  });
}

function getAttrProps() {
  const defaultConfig = { label: 'label', value: 'value', disabled: 'disabled', tag: 'tag' };
  const attrProps = Object.assign(defaultConfig, props.props ?? {});
  return {
    label: attrProps.label,
    value: attrProps.value,
    disabled: attrProps.disabled,
    optionLabel: attrProps.optionLabel ?? attrProps.label,
    tag: attrProps.tag
  };
}

function getScriptKey() {
  return props.scriptKey ?? getAttrProps().value;
}

function focus() {
  const instance = _showPassword.value ? KScriptInputPassword.value : KScriptInputWrapper.value;
  if (!instance) {
    return;
  }
  setTimeout(() => {
    instance?.focus();
  });
}

function blur() {
  const instance = _showPassword.value ? KScriptInputPassword.value : KScriptInputWrapper.value;
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
  getCurrentMode,
  setCurrentMode,
  isStringMode,
  focus,
  blur,
  ..._methods
});
</script>
<style lang="less">
@import './style.less';
</style>
