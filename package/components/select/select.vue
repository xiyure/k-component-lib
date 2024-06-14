<template>
  <el-select
    ref="inputRef"
    v-model="inputValue"
    class="k-select"
    v-bind="$attrs"
    :size="getCompSize(props.size)"
    default-first-option
    @change="handleChangeEvent"
    @focus="handleFocusEvent"
    @blur="handleBlurEvent"
    @clear="handleClearEvent"
    @visible-change="handleVisibleChangeEvent"
    @remove-tag="handleRemoveTagEvent"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { SelectInputProps } from './type';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KSelect'
});

const props = withDefaults(defineProps<SelectInputProps>(), {
  size: 'base'
});

const emits = defineEmits([
  'update:modelValue',
  'blur',
  'change',
  'clear',
  'focus',
  'visible-change',
  'remove-tag'
]);

const inputValue = ref('');
const inputRef = ref<any>(null);

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
}, { immediate: true });

function handleBlurEvent() {
  emits('blur');
}
function handleFocusEvent() {
  emits('focus');
}
function handleChangeEvent(value: any) {
  emits('update:modelValue', value);
  emits('change', value);
}
function handleClearEvent() {
  emits('update:modelValue', '');
  emits('clear', '');
  emits('change', '');
}
function handleVisibleChangeEvent(value:boolean) {
  emits('visible-change', value);
}
function handleRemoveTagEvent(tag:any) {
  emits('remove-tag', tag);
}
function focus() {
  inputRef.value?.focus();
}
function blur() {
  inputRef.value?.blur();
}

defineExpose({
  focus,
  blur
});
</script>

<style lang="less">
@import './style.less';
</style>