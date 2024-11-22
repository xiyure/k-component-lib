<template>
  <el-input
    ref="inputRef"
    :class="[
      'k-input',
      {
        'k-input-has-prepend': slots.prepend,
        'k-input-has-append': slots.append,
      },
      _styleModule,
    ]"
    v-bind="$attrs"
    :prefix-icon="iconLeft ?? prefixIcon"
    :suffix-icon="iconRight ?? suffixIcon"
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
    </template>
    <template v-if="slots.append" #append>
      <div :class="slotClass(appendSlotType)">
        <slot name="append"></slot>
      </div>
    </template>
  </el-input>
</template>
<script setup lang="ts">
import { ref, computed, inject, provide, SlotsType } from 'vue';
import { ElInput } from 'element-plus';
import { InputProps } from './type';
import { getExposeProxy, SIZE_KEY } from '../../utils';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KInput'
});

const props = withDefaults(defineProps<InputProps>(), {
  iconLeft: undefined,
  iconRight: undefined,
  prepend: undefined,
  append: undefined,
  prefixIcon: undefined,
  suffixIcon: undefined
});

const formatSize = useSize<InputProps>(props);

const _styleModule = inject('_styleModule', '');
const slots = defineSlots(); // 具名插槽
const prependSlot = slots.prepend?.();
const prependSlotType = prependSlot?.[0]?.type;

const appendSlot = slots.append?.();
const appendSlotType = appendSlot?.[0]?.type;

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
defineExpose(getExposeProxy(instance, inputRef));
</script>

<style lang="less">
@import './style.less';
</style>
