<template>
  <el-option-group class="k-option-group" :label="props.label">
    <slot></slot>
  </el-option-group>
</template>

<script setup lang="ts">
defineOptions({
  name: 'KOptionGroup'
});

const props = defineProps({
  label: {
    type: String,
    default: ''
  }
});
</script>

<style lang="less">
@import './style.less';
</style>