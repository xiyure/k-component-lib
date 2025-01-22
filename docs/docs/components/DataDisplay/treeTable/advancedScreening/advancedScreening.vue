<template>
  <div :style="{ height: '420px' }">
    <k-tree-table
      :data="tableData"
      :column="column"
      :show-page="false"
      :advanced-filter-config="{
        filterAll: true,
        exclude: ['sex'],
        filterColumns: [
          {
            title: 'Age',
            field: 'age',
            dataType: 'number',
            options: [
              {
                label: '22',
                value: 22,
              },
              {
                label: '23',
                value: 23,
              },
            ],
          },
        ],
      }"
    ></k-tree-table>
  </div>
</template>

<script lang="tsx" setup>
import { ref, reactive } from 'vue';

const tableData = reactive([
  { id: 1, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc', date: '2022-01-01' },
  { id: 2, name: 'Test2', role: 'Test', sex: 'Women', age: 42, address: 'Guangzhou', date: '2022-01-02' },
  { id: 3, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', date: '2022-01-03' },
  { id: 4, name: 'Test4', role: 'Designer', sex: 'Women', age: 18, address: 'Shanghai', date: '2022-01-04' },
  { id: 5, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'test abc', date: '2022-01-05' },
  { id: 6, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou', date: '2022-01-06' },
  { id: 7, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'Shanghai', date: '2022-01-07' },
  { id: 8, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai', date: '2022-01-08' },
  { id: 9, name: 'Test9', role: 'Develop', sex: 'Man', age: 28, address: 'test abc', date: '2022-01-09' },
  { id: 10, name: 'Test10', role: 'Test', sex: 'Women', age: 42, address: 'Guangzhou', date: '2022-01-10' },
  { id: 11, name: 'Test11', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', date: '2022-01-11' },
  { id: 12, name: 'Test12', role: 'Designer', sex: 'Women', age: 18, address: 'Shanghai', date: '2022-01-12' },
  { id: 13, name: 'Test13', role: 'Develop', sex: 'Man', age: 39, address: 'test abc', date: '2022-01-13' },
  { id: 14, name: 'Test14', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou', date: '2022-01-14' },
  { id: 15, name: 'Test15', role: 'PM', sex: 'Man', age: 9, address: 'Shanghai', date: '2022-01-15' },
  { id: 16, name: 'Test16', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai', date: '2022-01-16' }
]);

const column = ref([
  {
    type: 'checkbox',
    width: '50'
  },
  {
    title: 'Id',
    field: 'id',
    width: '50',
    sortable: true,
    dataType: 'number'
  },
  {
    title: 'Name',
    field: 'name',
    sortable: true,
    cellRender: {},
    render: () => (
      <span style={{ color: 'red' }}>
        <k-tag point>标签</k-tag>
      </span>
    ),
    dataType: 'string'
  },
  {
    title: 'Role',
    field: 'role',
    showIcon: true,
    dataType: 'string',
    formatter: ({ cellValue, row, column }) => `${cellValue}-${row.id}-${column.field}`,
    align: 'center'
  },
  {
    title: 'Sex',
    field: 'sex',
    dataType: 'string',
    formatter: ({ cellValue }) => (cellValue === 'Man' ? '男' : '女'),
    align: 'left'
  },
  {
    title: 'Age',
    field: 'age',
    dataType: 'number',
    showIcon: true,
    __folder: true,
    align: 'right'
  },
  {
    title: 'Address',
    field: 'address',
    dataType: 'string'
  },
  {
    title: '生日',
    field: 'date',
    dataType: 'date'
  },
]);
</script>
<style scoped></style>
