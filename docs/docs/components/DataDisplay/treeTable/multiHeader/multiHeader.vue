<template>
  <div :style="{ height: '300px' }">
    <k-tree-table
      :data="tableData" :column="columnPro" :show-page="false"
      border
    ></k-tree-table>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';

const columnPro = [
  {
    title: 'Id',
    field: 'id',
    width: '50px',
    dataType: 'number'
  },
  {
    title: 'Name',
    field: 'name',
    render: ({ row }) => <span style={{ color: 'green' }}>{row.name}</span>
  },
  {
    title: 'Role',
    field: 'role',
    dataType: 'string'
  },
  {
    title: 'Other1',
    field: 'other1',
    group: [
      {
        title: 'Other2',
        field: 'other2',
        group: [
          {
            title: 'Age',
            field: 'age',
            dataType: 'number',
            showIcon: true,
            __folder: true
          },
          {
            title: 'Sex',
            field: 'sex',
            dataType: 'string',
            render: ({ row }) => <span style={{ color: 'red' }}>{row.sex}</span>
          }
        ]
      },
      {
        title: 'Address',
        field: 'address',
        dataType: 'string'
      }
    ]
  }
];
const tableData = ref([
  {
    id: 1,
    name: 'Test1',
    role: 'Develop',
    sex: 'Man',
    age: 28,
    address: 'test abc',
    icon: 'IconFolderOpen',
    iconStyle: {
      empty: false,
      color: '#f60',
      size: 20
    }
  },
  {
    id: 2,
    name: 'Test2',
    role: 'Test',
    sex: 'Women',
    age: 42,
    address: 'Guangzhou',
    icon: 'IconFolderOpen',
    iconStyle: {
      empty: false,
      color: '#f60',
      size: 16
    }
  },
  {
    id: 3,
    name: 'Test3',
    role: 'PM',
    sex: 'Man',
    age: 32,
    address: 'Shanghai',
    icon: 'IconFolderOpen',
    iconStyle: {
      empty: false,
      color: '#f60',
      size: 16
    }
  },
  { id: 4, name: 'Test4', role: 'Designer', sex: 'Women', age: 18, address: 'Shanghai' },
  { id: 5, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'test abc' },
  { id: 6, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 7, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'Shanghai' },
  { id: 8, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
  { id: 9, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10, name: 'Test2', role: 'Test', sex: 'Women', age: 42, address: 'Guangzhou' },
  { id: 11, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 12, name: 'Test4', role: 'Designer', sex: 'Women', age: 18, address: 'Shanghai' },
  { id: 13, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'test abc' },
  { id: 14, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 15, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'Shanghai' },
  { id: 16, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
]);
</script>
<style scoped></style>
