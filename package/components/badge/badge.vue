<template>
  <el-badge class="k-badge" v-bind="$attrs">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-badge>
</template>

<script setup lang="ts">
defineOptions({
  name: 'KBadge'
});

</script>

<style lang="less">
@import './style.less';
</style>