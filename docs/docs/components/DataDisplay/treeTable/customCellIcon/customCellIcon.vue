<template>
  <div :style="{ height: '300px' }">
    <k-tree-table
      :data="tableData1" :column="column5" :show-page="false"
      border
    ></k-tree-table>
  </div>
</template>

<script lang="tsx" setup>
import { ref, reactive } from 'vue';

// 包含图标的数据
const tableData1 = reactive([
  {
    id: 1,
    name: 'Test1',
    role: 'Develop',
    sex: 'Man',
    age: 28,
    address: 'test abc',
    icon: 'IconAdd',
    iconStyle: {
      size: 16,
      color: 'red'
    }
  },
  {
    id: 2,
    name: 'Test2',
    role: 'Test',
    sex: 'Women',
    age: 42,
    address: 'Guangzhou',
    __folder: true
  }
]);

const column5 = ref([
  {
    title: 'Id',
    field: 'id',
    width: '100',
    dataType: 'number'
  },
  {
    title: 'Name',
    field: 'name',
    showIcon: true
  },
  {
    title: 'Role',
    field: 'role'
  },
  {
    title: 'Sex',
    field: 'sex'
  },
  {
    title: 'Age',
    field: 'age',
    dataType: 'number'
  },
  {
    title: 'Address',
    field: 'address'
  }
]);
</script>
<style scoped></style>
