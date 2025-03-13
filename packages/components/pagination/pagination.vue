<template>
  <el-pagination
    ref="KPaginationRef"
    :class="['k-pagination', _styleModule]"
    v-bind="$attrs"
    :size="formatSize.elSize"
  >
    <slot />
  </el-pagination>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { ElPagination } from 'element-plus';
import { getExposeProxy } from '../../utils';
import { useSize } from '../../hooks';
import { PaginationProps } from './type';

defineOptions({
  name: 'KPagination'
});

const props = withDefaults(defineProps<PaginationProps>(), {});

const formatSize = useSize(props);

const _styleModule = inject('_styleModule', '');

const KPaginationRef = ref(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, KPaginationRef));
</script>

<style lang="less">
@import './style.less';
</style>