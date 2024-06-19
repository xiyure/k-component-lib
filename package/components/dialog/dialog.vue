<template>
  <el-dialog
    class="k-dialog"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">

defineOptions({
  name: 'KDialog'
});
</script>

<style lang="less">
@import './style.less';
</style>