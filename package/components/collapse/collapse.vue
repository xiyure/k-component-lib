<template>
  <el-collapse
    class="k-collapse"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-collapse>
</template>

<script setup lang="ts">

defineOptions({
  name: 'KCollapse'
});
</script>

<style lang="less">
@import './style.less';
</style>