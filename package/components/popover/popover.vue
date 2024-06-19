<template>
  <el-popover
    class="k-popover"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">

defineOptions({
  name: 'KPopover'
});
</script>

<style lang="less">
@import './style.less';
</style>