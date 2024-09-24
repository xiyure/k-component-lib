<template>
  <SBExamplePanel label="注释" open>
    <p>
      树形表格:
      <br />
      1.设置参数use-tree为true时启用树形表格(传入的数据需为扁平化的树形结构数组)
      <br />
      2.设置参数tree-config配置树形结构，参考vxe-table实现
      <br />
      3.需要再某列配置中设置treeNode属性为true，表示该列为树形结构的节点列
    </p>
  </SBExamplePanel>
  <br />
  <div :style="{ height: '300px' }">
    <k-tree-table
      :data="treeTableData"
      :column="treeColumn"
      use-tree
      :tree-config="{ rowField: 'id', parentField: 'parentId' }"
      :show-page="false"
      border
    ></k-tree-table>
  </div>
</template>

<script lang="tsx" setup>
import { ref, reactive } from 'vue';
import { KTreeTable, KTag } from '@components';

let treeTableData = ref([
  { id: 100001, parentId: null, name: 'Test1', type: 'mp3', sizes: 1024, date: '2020-08-01' },
  {
    id: 10050,
    hasChild: true,
    parentId: null,
    name: 'Test2',
    type: 'mp4',
    sizes: null,
    date: '2021-04-01',
  },
  {
    id: 24300,
    parentId: 10050,
    hasChild: false,
    name: 'Test3',
    type: 'avi',
    sizes: 1024,
    date: '2020-03-01',
  },
  { id: 20045, parentId: 24300, name: 'Test4', type: 'html', sizes: 600, date: '2021-04-01' },
  { id: 10053, parentId: 24300, name: 'Test5', type: 'avi', sizes: null, date: '2021-04-01' },
  { id: 24330, parentId: 10053, name: 'Test6', type: 'txt', sizes: 25, date: '2021-10-01' },
  { id: 21011, parentId: 10053, name: 'Test7', type: 'pdf', sizes: 512, date: '2020-01-01' },
  { id: 22200, parentId: 10053, name: 'Test8', type: 'js', sizes: 1024, date: '2021-06-01' },
  { id: 23666, parentId: null, name: 'Test9', type: 'xlsx', sizes: 2048, date: '2020-11-01' },
  { id: 23677, parentId: 23666, name: 'Test10', type: 'js', sizes: 1024, date: '2021-06-01' },
  { id: 23671, parentId: 23677, name: 'Test11', type: 'js', sizes: 1024, date: '2021-06-01' },
  { id: 23672, parentId: 23677, name: 'Test12', type: 'js', sizes: 1024, date: '2021-06-01' },
  { id: 23688, parentId: 23666, name: 'Test13', type: 'js', sizes: 1024, date: '2021-06-01' },
  { id: 23681, parentId: 23688, name: 'Test14', type: 'js', sizes: 1024, date: '2021-06-01' },
  { id: 23682, parentId: 23688, name: 'Test15', type: 'js', sizes: 1024, date: '2021-06-01' },
  { id: 24555, parentId: null, name: 'Test16', type: 'avi', sizes: 224, date: '2020-10-01' },
  { id: 24566, parentId: 24555, name: 'Test17', type: 'js', sizes: 1024, date: '2021-06-01' },
  { id: 24577, parentId: 24555, name: 'Test18', type: 'js', sizes: 1024, date: '2021-06-01' },
]);

// 列排序配置示例
const treeColumn = [
  {
    title: 'Id',
    field: 'id',
    width: '100px',
    treeNode: true,
    dataType: 'number',
  },
  {
    title: 'Name',
    field: 'name',
    dataType: 'string',
  },
  {
    title: 'Type',
    field: 'type',
  },
  {
    title: 'Size',
    field: 'sizes',
  },
  {
    title: 'Date',
    field: 'date',
  },
];
</script>
<style scoped></style>
