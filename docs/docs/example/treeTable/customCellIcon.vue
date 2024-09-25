<template>
  <!-- 单元格图标 -->
  <!-- 1.单元格支持单独配置图标，需要再列配置中添加showIconcolon属性设置为true，然后才能读取行数据row中的icon属性
    2.由于业务使用文件夹图标场景较多，因此内置了folder图标，在行数据中设置__folder属性为true即可展示文件夹图标，优先级高于icon
    同时支持给图标设置样式
    3.在行数据中设置iconStyle属性即可，包含color（颜色）、size（大小）、indent（图标与文字距离）、
    empty（__folder为true时使用，表示文件夹为空）等属性
  -->
  <SBExamplePanel label="注释" open>
    <p>
      单元格图标:
      <br />
      1.单元格支持单独配置图标，需要再列配置中添加showIconcolon属性设置为true，然后才能读取行数据row中的icon属性;
      <br />
      2.由于业务使用文件夹图标场景较多，因此内置了folder图标，在行数据中设置__folder属性为true即可展示文件夹图标，优先级高于
      icon 同时支持给图标设置样式;
      <br />
      3.在行数据中设置iconStyle属性即可，包含color（颜色）、size（大小）、indent（图标与文字距离）、
      empty（__folder为true时使用，表示文件夹为空）等属性。
    </p>
  </SBExamplePanel>
  <br />
  <p>单元格图标</p>
  <div :style="{ height: '300px' }">
    <k-tree-table
      :data="tableData1" :column="column5" :show-page="false"
      border
    ></k-tree-table>
  </div>
</template>

<script lang="tsx" setup>
import { ref, reactive } from 'vue';
import { KTreeTable } from '@components';

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
      color: 'red',
    },
  },
  {
    id: 2,
    name: 'Test2',
    role: 'Test',
    sex: 'Women',
    age: 42,
    address: 'Guangzhou',
    __folder: true,
  },
  {
    id: 3,
    name: 'Test3',
    role: 'PM',
    sex: 'Man',
    age: 32,
    address: 'Shanghai',
  },
  {
    id: 4,
    name: 'Test4',
    role: 'Designer',
    sex: 'Women',
    age: 18,
    address: 'Shanghai',
  },
  {
    id: 5,
    name: 'Test5',
    role: 'Develop',
    sex: 'Man',
    age: 39,
    address: 'test abc',
  },
  {
    id: 6,
    name: 'Test6',
    role: 'Test',
    sex: 'Women',
    age: 22,
    address: 'Guangzhou',
  },
  { id: 7, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'Shanghai' },
  {
    id: 8,
    name: 'Test8',
    role: 'Designer',
    sex: 'Women',
    age: 24,
    address: 'Shanghai',
  },
  {
    id: 9,
    name: 'Test9',
    role: 'Develop',
    sex: 'Man',
    age: 28,
    address: 'test abc',
  },
  {
    id: 10,
    name: 'Test10',
    role: 'Test',
    sex: 'Women',
    age: 42,
    address: 'Guangzhou',
  },
  {
    id: 11,
    name: 'Test11',
    role: 'PM',
    sex: 'Man',
    age: 32,
    address: 'Shanghai',
  },
  {
    id: 12,
    name: 'Test12',
    role: 'Designer',
    sex: 'Women',
    age: 18,
    address: 'Shanghai',
  },
  {
    id: 13,
    name: 'Test13',
    role: 'Develop',
    sex: 'Man',
    age: 39,
    address: 'test abc',
  },
  {
    id: 14,
    name: 'Test14',
    role: 'Test',
    sex: 'Women',
    age: 22,
    address: 'Guangzhou',
  },
  {
    id: 15,
    name: 'Test15',
    role: 'PM',
    sex: 'Man',
    age: 9,
    address: 'Shanghai',
  },
  {
    id: 16,
    name: 'Test16',
    role: 'Designer',
    sex: 'Women',
    age: 24,
    address: 'Shanghai',
  },
]);

const column5 = ref([
  {
    title: 'Id',
    field: 'id',
    width: '100',
    dataType: 'number',
  },
  {
    title: 'Name',
    field: 'name',
    showIcon: true,
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
