<template>
  <el-tab-pane
    ref="KTabPaneRef"
    :class="['k-tab-item', _styleModule]"
    v-bind="$attrs"
    :closable="props.closable"
  >
    <template #label>
      <k-tooltip :content="labelText" :visible="isOverflow && Boolean(labelText)">
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
import { ref, computed, useSlots, inject } from 'vue';
import { ElTabPane } from 'element-plus';
import { getExposeProxy } from '../../utils';
import { KTooltip } from '../tooltip';

defineOptions({
  name: 'KTabPane'
});

const props = defineProps({
  closable: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  }
});

const _styleModule = inject('_styleModule', '');
const KTabPaneRef = ref(null);
const slots = useSlots();
const isOverflow = ref(false);

const labelText = computed(() => {
  if (slots.label) {
    const labelSlotContent = slots.label?.()?.[0]?.children ?? '';
    return typeof labelSlotContent === 'string' ? labelSlotContent : null;
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
defineExpose(getExposeProxy(instance, KTabPaneRef));
</script>

<style lang="less">
@import './style.less';
</style>
