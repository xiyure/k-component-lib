<template>
  <!-- 自定义表格工具栏 -->
  <!-- 1.表格工具栏内置了高级筛选(filter)、刷新(refresh)、搜索框(search)、表头控制器功能(transfer)，
      通过widgets参数进行配置，widgets数组允许写入字符串和对象类型，传入内置功能的关键字(filter、refresh、search、transfer)时，
      表示使用内置的功能组件，传入其他字符串时，则该字符串会被当做插槽名渲染，也可以传入对象自定义渲染，
      格式为{id：xxx, widget: () => VNode | Component }, 表格默认展示搜索框和高级筛选，
      2.widgets传入空数组时或者使用show-filter:false和show-search:false属性时，则不展示
  -->
  <SBExamplePanel label="注释" open>
    <p>
      自定义表格工具栏:
      <br />
      1.表格工具栏内置了高级筛选(filter)、刷新(refresh)、搜索框(search)、表头控制器功能(transfer)，
      通过widgets参数进行配置，widgets数组允许写入字符串和对象类型，传入内置功能的关键字(filter、refresh、search、transfer)时，
      表示使用内置的功能组件，传入其他字符串时，则该字符串会被当做插槽名渲染，也可以传入对象自定义渲染，
      格式为{id：xxx, widget: () => VNode | Component }, 表格默认展示搜索框和高级筛选。
      <br />
      2.widgets传入空数组时或者使用show-filter:false和show-search:false属性时，则不展示。
    </p>
  </SBExamplePanel>
  <br />
  <div :style="{ height: '300px' }">
    <k-tree-table :data="tableData" :column="column" :show-page="false" :widgets="widgets" border>
      <template #custom1>custom1插槽</template>
    </k-tree-table>
  </div>
</template>

<script lang="tsx" setup>
import { ref, reactive } from 'vue';
import { KTreeTable, KTag } from '@components';

const widgets = ref([
  'search',
  'refresh',
  'filter',
  'transfer',
  'custom1',
  {
    id: 'custom2',
    widget: () => {
      return <KButton>自定义按钮</KButton>;
    },
  },
]);

const tableData = reactive([
  { id: 1, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 2, name: 'Test2', role: 'Test', sex: 'Women', age: 42, address: 'Guangzhou' },
  { id: 3, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 4, name: 'Test4', role: 'Designer', sex: 'Women', age: 18, address: 'Shanghai' },
  { id: 5, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'test abc' },
  { id: 6, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 7, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'Shanghai' },
  { id: 8, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
  { id: 9, name: 'Test9', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10, name: 'Test10', role: 'Test', sex: 'Women', age: 42, address: 'Guangzhou' },
  { id: 11, name: 'Test11', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 12, name: 'Test12', role: 'Designer', sex: 'Women', age: 18, address: 'Shanghai' },
  { id: 13, name: 'Test13', role: 'Develop', sex: 'Man', age: 39, address: 'test abc' },
  { id: 14, name: 'Test14', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 15, name: 'Test15', role: 'PM', sex: 'Man', age: 9, address: 'Shanghai' },
  { id: 16, name: 'Test16', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
]);

const column = ref([
  {
    type: 'checkbox',
    width: '50',
  },
  {
    title: 'Id',
    field: 'id',
    width: '50',
    sortable: true,
    dataType: 'number',
  },
  {
    title: 'Name',
    field: 'name',
    sortable: true,
    cellRender: {},
    render: ({ row, column }) => {
      return (
        <span style={{ color: 'red' }}>
          <k-tag point>标签</k-tag>
        </span>
      );
    },
    dataType: 'string',
  },
  {
    title: 'Role',
    field: 'role',
    showIcon: true,
    dataType: 'string',
    formatter: ({ cellValue, row, column }) => {
      return `${cellValue}-${row.id}-${column.field}`;
    },
    align: 'center',
  },
  {
    title: 'Sex',
    field: 'sex',
    dataType: 'string',
    formatter: ({ cellValue, row, column }) => {
      return cellValue === 'Man' ? '男' : '女';
    },
    align: 'left',
  },
  {
    title: 'Age',
    field: 'age',
    dataType: 'number',
    showIcon: true,
    __folder: true,
    align: 'right',
  },
  {
    title: 'Address',
    field: 'address',
    dataType: 'string',
  },
]);
</script>
<style scoped></style>
