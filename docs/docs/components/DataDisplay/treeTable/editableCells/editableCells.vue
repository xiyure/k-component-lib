<template>
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
import { ref } from 'vue';

const tableData = ref([
  { id: 1, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc', status: true },
  { id: 2, name: 'Test2', role: 'Test', sex: 'Women', age: 42, address: 'Guangzhou', status: true },
  { id: 3, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', status: true },
  {
    id: 4,
    name: 'Test4',
    role: 'Designer',
    sex: 'Women',
    age: 18,
    address: 'Shanghai',
    status: true
  },
  { id: 5, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'test abc', status: true },
  { id: 6, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou', status: true },
  { id: 7, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'Shanghai', status: true },
  {
    id: 8,
    name: 'Test8',
    role: 'Designer',
    sex: 'Women',
    age: 24,
    address: 'Shanghai',
    status: true
  },
  { id: 9, name: 'Test9', role: 'Develop', sex: 'Man', age: 28, address: 'test abc', status: true },
  {
    id: 10,
    name: 'Test10',
    role: 'Test',
    sex: 'Women',
    age: 42,
    address: 'Guangzhou',
    status: true
  },
  { id: 11, name: 'Test11', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', status: true },
  {
    id: 12,
    name: 'Test12',
    role: 'Designer',
    sex: 'Women',
    age: 18,
    address: 'Shanghai',
    status: true
  },
  {
    id: 13,
    name: 'Test13',
    role: 'Develop',
    sex: 'Man',
    age: 39,
    address: 'test abc',
    status: true
  },
  {
    id: 14,
    name: 'Test14',
    role: 'Test',
    sex: 'Women',
    age: 22,
    address: 'Guangzhou',
    status: true
  },
  { id: 15, name: 'Test15', role: 'PM', sex: 'Man', age: 9, address: 'Shanghai', status: true },
  {
    id: 16,
    name: 'Test16',
    role: 'Designer',
    sex: 'Women',
    age: 24,
    address: 'Shanghai',
    status: true
  }
]);

const column3 = ref([
  {
    title: 'Id',
    field: 'id',
    width: '100',
    dataType: 'number'
  },
  {
    title: 'Name',
    field: 'name',
    editRender: {},
    renderEdit: ({ row, column }) => <k-input teleported={false} v-model={row.name} />
  },
  {
    title: 'Role',
    field: 'role',
    renderEdit: ({ row, column }) => (
      <k-select teleported={false} v-model={row.role}>
        <k-option label='Develop' value='Develop' />
        <k-option label='Test' value='Test' />
        <k-option label='PM' value='PM' />
        <k-option label='Designer' value='Designer' />
      </k-select>
    )
  },
  {
    title: 'Sex',
    field: 'sex',
    renderEdit: ({ row, column }) => (
      <k-select teleported={false} v-model={row.sex}>
        <k-option label='Man' value='Man' />
        <k-option label='Women' value='Women' />
      </k-select>
    )
  },
  {
    title: 'Age',
    field: 'age',
    dataType: 'number'
  },
  {
    title: 'Address',
    field: 'address'
  },
  {
    title: 'Status',
    field: 'status',
    render: ({ row, column }) => <k-switch v-model={row.status}></k-switch>
  }
]);
</script>
<style scoped></style>
