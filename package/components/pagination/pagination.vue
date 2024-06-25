<template>
  <el-pagination
    class="k-pagination"
    v-bind="$attrs"
    :size="getCompSize(props.size)"
  />
</template>

<script setup lang="ts">
import { getCompSize } from '../../utils';
import { PaginationProps } from './type.d';

defineOptions({
  name: 'KPagination'
});

const props = withDefaults(defineProps<PaginationProps>(), {
  size: 'base'
});

</script>

<style lang="less">
@import './style.less';
</style>