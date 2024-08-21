<template>
  <el-tab-pane
    ref="KTabPaneRef"
    class="k-tab-item"
    v-bind="$attrs"
    :closable="props.closable"
  >
    <template #label>
      <span title="label" :class="props.closable ? 'k-tab-item-closeable' : ''">
        <slot name="label">{{ props.label }}</slot>
      </span>
    </template>
    <slot></slot>
  </el-tab-pane>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { handleExpose } from '../../utils';

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
const instance: any = {};
handleExpose(instance, KTabPaneRef, 'KTabPane');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>
