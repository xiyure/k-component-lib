<template>
  <el-input-number
    ref="inputNumberRef"
    class="k-input-number"
    v-bind="$attrs"
    :size="formatSize.elSize"
    @keydown="handleKeyDown"
    @compositionstart="handleCompositionStart"
    @compositionend="handleCompositionEnd"
    @paste="handlePaste"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-input-number>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElInputNumber } from 'element-plus';
import { InputNumberProps } from './type';
import { getExposeProxy } from '../../utils';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KInputNumber'
});

const props = withDefaults(defineProps<InputNumberProps>(), {});
const formatSize = useSize<InputNumberProps>(props);

const inputNumberRef = ref<HTMLElement | null>(null);

const filterChars = new Set(['+', '-', '.', 'e', 'E']);
let preValue = '';

function handleKeyDown(event: KeyboardEvent) {
  if (!props.onlyDigits) {
    return true;
  }
  if (filterChars.has(event.key)) {
    event.preventDefault();
    return false;
  }
  return true;
}

function handleCompositionStart(event: CompositionEvent) {
  if (isInputElement(event.target) && props.onlyDigits) {
    preValue = event.target.value;
  }
}

function handleCompositionEnd(event: CompositionEvent) {
  if (isInputElement(event.target) && props.onlyDigits) {
    event.target.value = preValue;
    const inputEvent = new Event('input', { bubbles: true });
    event.target.dispatchEvent(inputEvent);
  }
}

function handlePaste(event: ClipboardEvent) {
  if (isInputElement(event.target) && props.onlyDigits) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const text = clipboardData.getData('text/plain');
    if (/\D/g.test(text)) {
      event.preventDefault();
    }
  }
}

function isInputElement(el: unknown): el is HTMLInputElement {
  return el instanceof HTMLInputElement;
}

const instance: any = {};
defineExpose(getExposeProxy(instance, inputNumberRef));
</script>

<style lang="less">
@import './style.less';
</style>
