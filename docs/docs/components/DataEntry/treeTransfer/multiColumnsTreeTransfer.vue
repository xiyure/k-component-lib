<template>
  <k-tree-transfer
    :data="treeTransferData"
    use-tree
    :columns="column"
    @change="handleChange"
  ></k-tree-transfer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TreeTransferData } from '@ksware/ksw-ux';

const treeTransferData = ref([
  { id: 10000, pid: null, name: 'Test1', age: 18 },
  { id: 10050, pid: null, name: 'Test2', age: 18 },
  { id: 24300, pid: 10050, name: 'Test3', age: 19 },
  { id: 20045, pid: 24300, name: 'Test4', age: 20 },
]);

function handleChange(data: TreeTransferData) {
  console.log(data);
}

const column = ref([
  {
    type: 'checkbox',
    width: '50',
    dragSort: true
  },
  {
    title: '机器人名称',
    field: 'name',
    width: '200',
  },
  {
    title: '年龄',
    field: 'age',
    width: '100',
  }
]);
</script>
