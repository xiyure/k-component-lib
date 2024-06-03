<template>
  <div class="k-pagination">
    <el-pagination
      v-bind="attrs"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @change="handleChange"
      @prev-click="handlePrevClick"
      @next-click="handlenNextClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { PaginationProps } from './type';

defineOptions({
  name: 'KPagination'
});

const props = withDefaults(defineProps<PaginationProps>(), {
  pageSize: 10,
  background: true,
  currentPage: 1,
  layout: 'total, prev, pager, next, sizes, jumper'
});

const emits = defineEmits([
  'size-change',
  'current-change',
  'change', 
  'prev-click',
  'next-click'
]);

const pageSize = ref(props.pageSize);

const attrs = computed(() => ({
  total: props.total,
  pageSizes: props.pageSizes,
  disabled: props.disabled,
  background: props.background,
  layout: props.layout,
  small: props.small,
  pagerCount: props.pagerCount,
  currentPage: props.currentPage,
  defaultCurrentPage: props.defaultCurrentPage,
  popperClass: props.popperClass,
  prevText: props.prevText,
  prevIcon: props.prevIcon,
  nextText: props.nextText,
  nextIcon: props.nextIcon,
  teleported: props.teleported,
  hideOnSinglePage: props.hideOnSinglePage
}));

const handleChange = (pageNum: number) => {
  emits('change', pageNum);
};
const handleCurrentChange = (pageNum: number) => {
  emits('current-change', pageNum);
};
const handleSizeChange = (pageNum: number) => {
  pageSize.value = pageNum;
  emits('size-change', pageNum);
};
const handlePrevClick = (pageNum: number) => {
  emits('prev-click', pageNum);
};
const handlenNextClick = (pageNum: number) => {
  emits('next-click', pageNum);
};

</script>

<style lang="less">
@import './style.less';
</style>