<template>
  <el-pagination
    class="k-pagination"
    v-bind="$attrs"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    @change="handleChange"
    @prev-click="handlePrevClick"
    @next-click="handlenNextClick"
  />
</template>

<script setup lang="ts">

defineOptions({
  name: 'KPagination'
});

const emits = defineEmits([
  'size-change',
  'current-change',
  'change', 
  'prev-click',
  'next-click'
]);

const handleChange = (pageNum: number) => {
  emits('change', pageNum);
};
const handleCurrentChange = (pageNum: number) => {
  emits('current-change', pageNum);
};
const handleSizeChange = (pageNum: number) => {
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