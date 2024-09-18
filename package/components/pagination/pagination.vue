<template>
  <el-pagination
    ref="KPaginationRef"
    :class="['k-pagination', _styleModule]"
    v-bind="$attrs"
    :size="getCompSize(props.size)"
  />
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { ElPagination } from 'element-plus';
import { getCompSize, handleExpose } from '../../utils';
import { PaginationProps } from './type.d';

defineOptions({
  name: 'KPagination'
});

const props = withDefaults(defineProps<PaginationProps>(), {
  size: 'base'
});

const _styleModule = inject('_styleModule', '');
const KPaginationRef = ref(null);
const instance: any = {};
handleExpose(instance, KPaginationRef, 'KPagination');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>