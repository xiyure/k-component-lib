<template>
  <k-popover
    width="100%"
    :show-arrow="false"
    :visible="popperVisible"
    popper-class="k-script-input-popper"
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
    <ul>
      <li
        v-for="(item, index) in showOptions"
        :key="item.value"
        :class="['k-script-option', {'selected': index === selectedIndex }]"
        @click="selectOption(item, index)"
      >{{ item.label }}</li>
    </ul>
  </k-popover>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, onBeforeUnmount } from 'vue';
import { ScriptInputProps, ScriptOptions } from './type';
import { genRandomStr } from '../../utils';

defineOptions({
  name: 'KScriptInput',
});

const _styleModule = inject('_styleModule', '');

const props = withDefaults(defineProps<ScriptInputProps>(), {
  options: () => [],
  size: 'base',
});

const emits = defineEmits(['change', 'input', 'focus', 'blur', 'select']);

onMounted(() => {
  KScriptInput.value.addEventListener('keydown', toggleSelect);
});
onBeforeUnmount(() => {
  KScriptInput.value.removeEventListener('keydown', toggleSelect);
});

const prefix = `_${genRandomStr(8)}`;
const KScriptInput = ref();
let preTextValue: string = '';
const curInput = ref('');
const textValue = ref('');
const popperVisible = ref(false);
const selectedIndex = ref(-1);
let cacheIndex = -1;

const showOptions = computed(() => {
  return props.options.filter((item: ScriptOptions) => {
    return item.label.toLowerCase().indexOf(curInput.value.toLowerCase()) !== -1;
  });
})

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
  popperVisible.value = true;
  if (cacheIndex >= 0) {
    selectedIndex.value = cacheIndex;
  } else {
    selectedIndex.value = 0;
  }
  emits('focus');
}
function handleBlur() {
  popperVisible.value = false;
  if (preTextValue!== textValue.value) {
    preTextValue = textValue.value;
    parseText()
  }
  selectedIndex.value = -1;
  emits('blur');
}
function selectOption(option: ScriptOptions, index?: number | undefined) {
  if (!option) {
    return;
  }
  selectedIndex.value = index !== undefined ? index : selectedIndex.value;
  let endIndex = curInput.value.length ? -curInput.value.length : undefined;
  textValue.value = textValue.value.slice(0, endIndex);
  curInput.value = '';
  textValue.value += generateScriptTag(option.label)
  preTextValue = textValue.value;
  KScriptInput.value.innerHTML = textValue.value;
  cursorToEnd();
  emits('select', option);
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
  console.log(res)
  emits('change', res)
}
function generateScriptTag(content: string) {
  return `<div class="k-script-tag" contenteditable="false">${content}</div>`
}
function toggleSelect(event: KeyboardEvent) {

  if (event.code === 'ArrowUp') {
    selectedIndex.value--;
  } else if (event.code === 'ArrowDown') {
    selectedIndex.value++;
  } else if (event.code === 'Enter') {
    event.preventDefault();
    selectOption(showOptions.value[selectedIndex.value]);
  }
  if (selectedIndex.value < 0) {
    selectedIndex.value = showOptions.value.length - 1;
  }
  if (selectedIndex.value >= showOptions.value.length) {
    selectedIndex.value = 0;
  }
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
</script>

<style lang="less">
@import './style.less';
</style>
