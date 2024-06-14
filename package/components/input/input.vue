<template>
  <el-input
    ref="inputRef"
    v-model="inputValue"
    class="k-input"
    v-bind="$attrs"
    :size="getCompSize(props.size)"
    @input="handleInputEvent"
    @change="handleChangeEvent"
    @focus="handleFocusEvent"
    @blur="handleBlurEvent"
    @clear="handleClearEvent"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { InputProps } from './type';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KInput'
});

type InputValue = string | number;

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  size: 'base'
});

const emit = defineEmits(['update:modelValue', 'input', 'blur', 'change', 'clear', 'focus']);

const inputValue = ref<InputValue>('');
const inputRef = ref<any>(null);

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
}, { immediate: true });

const handleInputEvent = () => {
  emit('update:modelValue', inputValue.value);
  emit('input', inputValue.value);
};
const handleBlurEvent = () => {
  emit('blur');
};
const handleFocusEvent = () => {
  emit('focus');
};
const handleChangeEvent = (value:InputValue) => {
  emit('change', value);
};
const handleClearEvent = () => {
  emit('update:modelValue', '');
  emit('clear', '');
  emit('input', '');
  emit('change', '');
};
const focus = () => {
  inputRef.value?.focus();
};
const blur = () => {
  inputRef.value?.blur();
};
const select = () => {
  inputRef.value?.select();
};
const clear = () => {
  inputRef.value?.clear();
};
const resizeTextarea = () => {
  inputRef.value?.resizeTextarea();
};
defineExpose({
  focus,
  blur,
  select,
  clear,
  resizeTextarea,
});
</script>

<style lang="less">
@import './style.less';
</style>