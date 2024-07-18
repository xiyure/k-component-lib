<template>
  <el-input
    ref="inputRef"
    class="k-input"
    :class="{ 'k-input-has-prepend': slots.prepend, 'k-input-has-append': slots.append }"
    v-bind="$attrs"
    :prefix-icon="iconLeft ?? prefixIcon"
    :suffix-icon="iconRight ?? suffixIcon"
    :size="getCompSize(props.size)"
  >
    <template v-if="slots.prepend" #prepend>
      <div :class="prependSlotClass()">
        <slot name="prepend"></slot>
      </div>
    </template>
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
    <template v-if="slots.append" #append>
      <div :class="appendSlotClass()">
        <slot name="append"></slot>
      </div>
    </template>
  </el-input>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { InputProps } from './type.d';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KInput',
});

const props = withDefaults(defineProps<InputProps>(), {
  size: 'base',
  iconLeft: undefined,
  iconRight: undefined,
  prepend: undefined,
  append: undefined,
  prefixIcon: undefined,
  suffixIcon: undefined,
});

const slots = defineSlots(); // 具名插槽
const prependSlot = slots.prepend?.();
const prependSlotType = prependSlot?.[0]?.type;

const appendSlot = slots.append?.();
const appendSlotType = appendSlot?.[0]?.type;

const prependSlotClass = () => {
  switch (typeof prependSlotType) {
    case 'string':
      return 'k-input-slot--htmlTag';
    case 'object':
      return 'k-input-slot--component';
    case 'symbol':
      return 'k-input-slot--string';
    default:
      return '';
  }
};

const appendSlotClass = () => {
  switch (typeof appendSlotType) {
    case 'string':
      return 'k-input-slot--htmlTag';
    case 'object':
      return 'k-input-slot--component';
    case 'symbol':
      return 'k-input-slot--string';
    default:
      return '';
  }
};

const inputRef = ref<any>(null);

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
