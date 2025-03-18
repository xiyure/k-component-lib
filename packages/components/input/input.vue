<template>
  <el-input
    ref="inputRef"
    :class="[
      'k-input',
      {
        'k-input-has-prepend': slots.prepend,
        'k-input-has-append': slots.append
      }
    ]"
    v-bind="$attrs"
    :prefix-icon="iconLeft ?? prefixIcon"
    :suffix-icon="iconRight ?? suffixIcon"
    :type="InputType"
    :size="formatSize.elSize"
  >
    <template v-if="slots.prepend" #prepend>
      <div :class="slotClass(prependSlotType)">
        <slot name="prepend"></slot>
      </div>
    </template>
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template #suffix>
      <slot name="suffix"></slot>
      <div @click="switchPassword">
        <IconShow v-if="!isText && isPasswordVisible" />
      </div>
      <div @click="switchPassword">
        <IconHide v-if="isText && isPasswordVisible" />
      </div>
    </template>
    <template v-if="slots.append" #append>
      <div :class="slotClass(appendSlotType)">
        <slot name="append"></slot>
      </div>
    </template>
  </el-input>
</template>
<script setup lang="ts">
import { ref, computed, provide, SlotsType, useAttrs } from 'vue';
import { ElInput } from 'element-plus';
import { InputProps } from './type';
import { getExposeProxy } from '../../utils';
import { SIZE_KEY, useSize } from '../../hooks';

defineOptions({
  name: 'KInput'
});

const props = withDefaults(defineProps<InputProps>(), {
  iconLeft: undefined,
  iconRight: undefined,
  prepend: undefined,
  append: undefined,
  prefixIcon: undefined,
  suffixIcon: undefined,
  showPassword: false,
  type: 'text'
});

const formatSize = useSize<InputProps>(props);

const slots = defineSlots(); // 具名插槽
const prependSlot = slots.prepend?.();
const prependSlotType = prependSlot?.[0]?.type;

const appendSlot = slots.append?.();
const appendSlotType = appendSlot?.[0]?.type;
const isText = ref(false);
const InputType = ref(props.type);

const isPasswordVisible = computed(() => props.showPassword && useAttrs().modelValue);

const slotClass = computed(() => (slot: SlotsType) => {
  switch (typeof slot) {
    case 'string':
      return 'k-input-slot--htmlTag';
    case 'object':
      return 'k-input-slot--component';
    case 'symbol':
      return 'k-input-slot--string';
    default:
      return '';
  }
});

provide(SIZE_KEY, formatSize);

const inputRef = ref();

const instance: any = {};

const switchPassword = () => {
  isText.value = !isText.value;
  InputType.value = isText.value ? 'text' : 'password';
};

defineExpose(getExposeProxy(instance, inputRef));
</script>

<style lang="less">
@import './style.less';
</style>
