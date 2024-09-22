<template>
  <!-- 可编辑单元格 -->
  <!-- 通过edit-config属性设置单元格可编辑，trigger属性设置触发编辑的方式，可选值有click、dblclick，默认为click，
      需要再列配置中设置editRender参数和renderEdit参数用于自定义配置编辑状态下所展示的内容
  -->
  <SBExamplePanel label="注释" open>
    <p>
      可编辑单元格:
      <br />
      通过edit-config属性设置单元格可编辑，trigger属性设置触发编辑的方式，可选值有click、dblclick，默认为click，
      需要再列配置中设置editRender参数和renderEdit参数用于自定义配置编辑状态下所展示的内容
    </p>
  </SBExamplePanel>
  <br />
  <div :style="{ height: '300px' }">
    <k-tree-table
      :data="tableData"
      :column="column3"
      :show-page="false"
      :edit-config="{ trigger: 'dblclick', mode: 'cell' }"
      border
    ></k-tree-table>
  </div>
</template>

<script lang="tsx" setup>
import { ref, reactive } from 'vue';

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

const column3 = ref([
  {
    title: 'Id',
    field: 'id',
    width: '100',
    dataType: 'number',
  },
  {
    title: 'Name',
    field: 'name',
    editRender: {},
    renderEdit: ({ row, column }) => {
      return <input type='text' v-model={row[column.field]} />;
    },
  },
  {
    title: 'Role',
    field: 'role',
  },
  {
    title: 'Sex',
    field: 'sex',
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
