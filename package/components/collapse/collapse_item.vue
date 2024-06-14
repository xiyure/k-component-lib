<template>
  <el-collapse-item
    class="k-collapse-item"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-collapse-item>
</template>

<script setup lang="ts">
defineOptions({
  name: 'KCollapseItem'
});
</script>

<style lang="less">
@import './style.less';
</style>