<template>
  <el-pagination
    class="k-pagination"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">

defineOptions({
  name: 'KPagination'
});

</script>

<style lang="less">
@import './style.less';
</style>