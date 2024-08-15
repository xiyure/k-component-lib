<template>
  <el-tab-pane class="k-tab-item" v-bind="$attrs">
    <template v-if="$slots.label" #label>
      <slot name="label"></slot>
    </template>
    <slot></slot>
    <!-- <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template> -->
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