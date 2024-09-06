<template>
  <el-tab-pane
    ref="KTabPaneRef"
    class="k-tab-item"
    v-bind="$attrs"
    :closable="props.closable"
  >
    <template #label>
      <k-tooltip :content="labelText" :visible="isOverflow">
        <span
          :class="props.closable ? 'k-tab-item-closeable' : ''"
          @mouseenter="handleMouseEnter"
          @mouseleave="hideToolTip"
        >
          <slot name="label">{{ props.label }}</slot>
        </span>
      </k-tooltip>
    </template>
    <slot></slot>
  </el-tab-pane>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue';
import { handleExpose } from '../../utils';
import { KTooltip } from '../tooltip';

defineOptions({
  name: 'KTabPane',
});

const props = defineProps({
  closable: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
});

const KTabPaneRef = ref(null);
const slots = useSlots();
const isOverflow = ref(false);

const labelText = computed(() => {
  if (slots.label) {
    const labelSlotContent = slots.label?.()?.[0]?.children ?? '';
    return labelSlotContent;
  }
  return props.label;
});

let timer: any = null;
function handleMouseEnter(e: Event) {
  const target = e.target as HTMLElement;
  if (target.clientWidth < target.scrollWidth) {
    timer = setTimeout(() => {
      isOverflow.value = true;
    }, 500);
    return;
  }
  hideToolTip();
}
function hideToolTip() {
  timer && clearTimeout(timer);
  isOverflow.value = false;
}
const instance: any = {};
handleExpose(instance, KTabPaneRef, 'KTabPane');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>
