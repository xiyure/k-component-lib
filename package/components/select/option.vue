<template>
  <el-option
    class="k-option"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-option>
</template>

<script setup lang="ts">

defineOptions({
  name: 'KOption'
});

</script>

<style lang="less">
@import './style.less';
</style>