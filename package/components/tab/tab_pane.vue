<template>
  <el-tab-pane class="k-tab-item" v-bind="$attrs">
    <template v-if="$slots.label" #label>
      <slot name="label"></slot>
    </template>
    <slot></slot>
  </el-tab-pane>
</template>

<script setup lang="ts">
defineOptions({
  name: 'KTabPane'
});
</script>

<style lang="less">
@import './style.less';
</style>