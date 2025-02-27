<template>
  <div :style="{ height: '300px' }">
    <k-tree-table
      :data="tableData" :column="column4" :show-page="false"
      border
    >
      <template #name="{ row }">kingsware-{{ row.name }}</template>
    </k-tree-table>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';

const tableData = ref([
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
  { id: 16, name: 'Test16', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
]);

const column4 = ref([
  {
    title: 'Id',
    field: 'id',
    width: '100',
    dataType: 'number'
  },
  {
    title: 'Name',
    field: 'name'
  },
  {
    title: 'Role',
    field: 'role',
    render: ({ row }) => {
      if (row.role === 'Develop') {
        return <k-tag>{row.role}</k-tag>;
      } else if (row.role === 'Test') {
        return <k-tag type="success">{row.role}</k-tag>;
      } else {
        return <k-tag type="warning">{row.role}</k-tag>;
      }
    }
  },
  {
    title: 'Sex',
    field: 'sex',
    render: ({ row }) => {
      if (row.sex === 'Man') {
        return <span style={{ color: 'green' }}>男</span>;
      } if (row.sex === 'Women') {
        return <span style={{ color: 'red' }}>女</span>;
      } 
      return <span style={{ color: 'black' }}>未知</span>;
    }
  },
  {
    title: 'Age',
    field: 'age',
    dataType: 'string'
  },
  {
    title: 'Address',
    field: 'address'
  },
  {
    title: '操作',
    field: 'operation',
    fixed: 'right',
    width: '200',
    render: ({ row }) => {
      return <k-button onClick={() => console.log(row)}>操作</k-button>;
    }
  },
]);
</script>
<style scoped></style>
