<template>
  <k-button @click="handleChangeArr('add')">+</k-button>
  <k-button @click="handleChangeArr('remove')">-</k-button>
  <k-tree-transfer
    v-model="arr"
    label="name"
    :data="treeTransferData"
    @change="handleChange"
  >
  </k-tree-transfer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TreeTransferData } from '@ksware/ksw-ux';

const defaultData = ['22200', '24555'];

const treeTransferData = [
  { id: 10000, pid: null, name: 'Test1', age: 18 },
  { id: 10050, pid: null, name: 'Test2', age: 18 },
  { id: 24300, pid: 10050, name: 'Test3', age: 19 },
  { id: 20045, pid: 24300, name: 'Test4', age: 20 },
  { id: 10053, pid: 24300, name: 'Test5' },
  { id: 24330, pid: 10053, name: 'Test6' },
  { id: 21011, pid: 10053, name: 'Test7' },
  { id: 22200, pid: 10053, name: 'Test8' },
  { id: 23666, pid: null, name: 'Test9' },
  { id: 23677, pid: 23666, name: 'Test10' },
  { id: 23671, pid: 23677, name: 'Test11' },
  { id: 23672, pid: 23677, name: 'Test12' },
  { id: 23688, pid: 23666, name: 'Test13' },
  { id: 23681, pid: 23688, name: 'Test14' },
  { id: 23682, pid: 23688, name: 'Test15' },
  { id: 24555, pid: null, name: 'Test16' },
  { id: 24566, pid: 24555, name: 'Test17' },
  { id: 24577, pid: 24555, name: 'Test18' }
];

function handleChange(data: TreeTransferData) {
  console.log(data, arr.value);
}

const column = ref([
  {
    type: 'checkbox',
    width: 'auto',
    dragSort: true
  },
  {
    title: '机器人名称',
    field: 'name',
    width: 'auto'
  },
  {
    title: '年龄',
    field: 'age',
    width: 'auto'
  }
]);

const arr = ref<TreeTransferData>([]);

let count = 0;

const handleChangeArr = (type) => {
  if (count < 0 || count >= treeTransferData.length) {
    console.warn('Count out of bounds!');
    return;
  }

  if (type === 'add') {
    if (!arr.value.includes(treeTransferData[count].id)) {
      arr.value.push(treeTransferData[count].id);
      console.log('Added:', arr.value);
    }
    count++;
  } else if (type === 'remove' && count > 0) {
    const index = arr.value.indexOf(treeTransferData[count - 1].id);
    if (index !== -1) {
      arr.value.splice(index, 1);
      console.log('Removed:', arr.value);
    }
    count--;
  }
  if (count < 0) count = 0;
  if (count >= treeTransferData.length) count = treeTransferData.length - 1;
};
</script>
