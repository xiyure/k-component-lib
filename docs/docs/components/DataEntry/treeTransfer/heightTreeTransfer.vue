<template>
  <k-tree-transfer
    :data="treeTransferData"
    :table-height="600"
    use-tree
    label="name"
    @change="handleChange"
  ></k-tree-transfer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TreeTransferData } from '@ksware/ksw-ux';

const treeTransferData = ref([
  { id: 10000, pid: null, name: 'Test1' },
  { id: 10050, pid: null, name: 'Test2' },
  { id: 24300, pid: 10050, name: 'Test3' },
  { id: 20045, pid: 24300, name: 'Test4' },
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
]);

function handleChange(data: TreeTransferData) {
  console.log(data);
}
</script>
