<template>
  <div class="k-select">
    <el-select
      ref="inputRef"
      v-model="inputValue"
      v-bind="attrs"
      default-first-option
      :style="{
        width: props.width
      }"
      @change="handleChangeEvent"
      @focus="handleFocusEvent"
      @blur="handleBlurEvent"
      @clear="handleClearEvent"
      @visible-change="handleVisibleChangeEvent"
      @remove-tag="handleRemoveTagEvent"
    >
      <slot></slot>
      <template v-if="slots.tag" #tag>
        <slot v-if="slots.tag" name="tag"></slot>
      </template>
      <template v-if="slots.empty" #empty>
        <slot name="empty"></slot>
      </template>
      <template v-if="slots.header" #header>
        <slot name="header"></slot>
      </template>
      <template v-if="slots.footer" #footer>
        <slot name="footer"></slot>
      </template>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ISelectInputProps } from '../../interface/index';

defineOptions({
  name: 'KSelect'
});

type InputValue = string | number;

const props = withDefaults(defineProps<ISelectInputProps>(), {});

const emits = defineEmits([
  'update:modelValue',
  'blur',
  'change',
  'clear',
  'focus',
  'visible-change',
  'remove-tag'
]);

const slots = defineSlots();

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
  disabled: props.disabled,
  placeholder: props.placeholder,
  clearable: props.clearable,
  multiple: props.multiple,
  filterable: props.filterable,
  allowCreate: props.allowCreate,
  popperClass: props.popperClass
});

function handleBlurEvent() {
  emits('blur');
}
function handleFocusEvent() {
  emits('focus');
}
function handleChangeEvent(value:InputValue) {
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