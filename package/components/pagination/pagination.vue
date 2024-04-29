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
import { IPaginationProps } from '../../interface/index';

defineOptions({
  name: 'KPagination'
});

const props = withDefaults(defineProps<IPaginationProps>(), {
  pageSize: 10,
  background: true,
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
  ...getSizeAttrs(),
  ...getOriginAttrs(),
}));

const getSizeAttrs = ():object => ({
  small: props.size === 'sm',
});
const getOriginAttrs = () => ({
  total: props.total,
  pageSizes: props.pageSizes,
  disabled: props.disabled,
  background: props.background,
  layout: props.layout
});

const handleChange = (pageNum: number) => {
  emits('change', pageNum);
};
const handleCurrentChange = (pageNum: number) => {
  emits('size-change', pageNum);
};
const handleSizeChange = (pageNum: number) => {
  pageSize.value = pageNum;
  emits('current-change', pageNum);
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