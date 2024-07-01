<template>
  <el-dropdown-item v-bind="$attrs">
    <slot></slot>
  </el-dropdown-item>
</template>

<script setup lang="ts">
defineOptions({
  name: 'KDropDownItem'
});
</script>

<style lang="less">
@import './style.less';
</style>