<template>
  <div class="k-option">
    <el-option-group :label="props.label">
      <slot></slot>
    </el-option-group>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  label: {
    type: String,
    default: ''
  }
});
</script>

<script lang="ts">
export default {
  name: 'KOptionGroup',
};
</script>

<style lang="less">
@import './style.less';
</style>