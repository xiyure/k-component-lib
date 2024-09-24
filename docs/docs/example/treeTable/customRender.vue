<template>
  <!-- 自定义渲染 -->
  <!-- 表格通过具名插槽(插槽名为field字段)和列配置中的render函数自定义渲染单元格内容，已如下表格name和sex列为例 -->
  <SBExamplePanel label="注释" open>
    <p>
      自定义渲染:
      <br />
      表格通过具名插槽(插槽名为field字段)和列配置中的render函数自定义渲染单元格内容，已如下表格name和sex列为例。
    </p>
  </SBExamplePanel>
  <br />
  <div :style="{ height: '300px' }">
    <k-tree-table :data="tableData" :column="column4" :show-page="false" border>
      <template #name="{ row, column }">kingsware-{{ row.name }}</template>
    </k-tree-table>
  </div>
</template>

<script lang="tsx" setup>
import { ref, reactive } from 'vue';
import { KTreeTable } from '@components';

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

const column4 = ref([
  {
    title: 'Id',
    field: 'id',
    width: '100',
    dataType: 'number',
  },
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Role',
    field: 'role',
  },
  {
    title: 'Sex',
    field: 'sex',
    render: ({ row, column }) => {
      if (row.sex === 'Man') {
        return <span style={{ color: 'green' }}>男</span>;
      } else if (row.sex === 'Women') {
        return <span style={{ color: 'red' }}>女</span>;
      } else {
        return <span style={{ color: 'black' }}>未知</span>;
      }
    },
  },
  {
    title: 'Age',
    field: 'age',
    dataType: 'number',
  },
  {
    title: 'Address',
    field: 'address',
  },
]);
</script>
<style scoped></style>
