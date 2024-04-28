<template>
  <div class="k-input">
    <el-input
      ref="inputRef"
      v-model="inputValue"
      v-bind="attrs"
      :style="{
        width: props.width
      }"
      @input="handleInputEvent"
      @change="handleChangeEvent"
      @focus="handleFocusEvent"
      @blur="handleBlurEvent"
      @clear="handleClearEvent"
    >
      <template
        v-if="slots.prepend"
        #prepend
      >
        <slot name="prepend"></slot>
      </template>
      <template
        v-if="slots.append"
        #append
      >
        <slot name="append"></slot>
      </template>
      <template
        v-if="slots.prefix"
        #prefix
      >
        <slot name="prefix"></slot>
      </template>
      <template
        v-if="slots.suffix"
        #suffix
      >
        <slot name="suffix"></slot>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { IInputProps } from '../../interface/index';

defineOptions({
  name: 'KInput'
});

type InputValue = string | number;

const props = withDefaults(defineProps<IInputProps>(), {
  modelValue: '',
  disabled: false,
  clearable: false,
  readonly: false,
  showWordLimit: false,
  autosize: false,
  showPassword: false,
});

const slots = defineSlots<{
  default?: any,
  prepend?: any,
  append?: any,
  prefix?: any,
  suffix?: any
}>();

const emit = defineEmits(['update:modelValue', 'input', 'blur', 'change', 'clear', 'focus']);

const inputValue = ref<InputValue>('');
const inputRef = ref<any>(null);

const attrs = computed(() => ({
  ...getSizeAttrs(),
  ...getOriginAttrs(),
}));

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
}, { immediate: true });

const getSizeAttrs = ():object => ({
  size: props.size === 'sm' ? 'small' : '',
});

const getOriginAttrs = () => ({
  id: props.id,
  name: props.name,
  label: props.label,
  type: props.type,
  disabled: props.disabled,
  placeholder: props.placeholder,
  readonly: props.readonly,
  clearable: props.clearable,
  prefixIcon: props.prefixIcon,
  suffixIcon: props.suffixIcon,
  showWordLimit: props.showWordLimit,
  autosize: props.autosize,
  rows: props.rows,
  showPassword: props.showPassword,
  maxLength: props.maxlength,
  minLength: props.minlength,
});
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