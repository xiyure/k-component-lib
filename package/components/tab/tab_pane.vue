<template>
  <el-tab-pane class="k-tab-item" v-bind="$attrs" :closable="props.closable">
    <template #label>
      <span title="label" :class="props.closable ? 'k-tab-item-closeable' : ''">
        <slot name="label">{{ props.label }}</slot>
      </span>
    </template>
    <slot></slot>
  </el-tab-pane>
</template>

<script setup lang="ts">
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
</script>

<style lang="less">
@import './style.less';
</style>
