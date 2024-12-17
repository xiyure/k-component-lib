<template>
  <KNewTransfer
    :tree-transfer-data="treeTransferData"
    :default-data="defaultList"
    default-val="windows"
    title="选择目标服务器"
    :select-list="[
      {
        name: 'winsssdows',
        type: 'Linux',
        fun: (type) => {
          console.log('你选了' + type);
        },
      },
      {
        name: 'Linssssux',
        type: 'windows',
        fun: (type) => {
          console.log('你选了' + type);
        },
      },
    ]"
  ></KNewTransfer>
</template>

<script setup lang="tsx">
const treeTransferData = [
  { id: 10000, name: '10.2.145.233', type: 'windows' },
  { id: 10050, name: '10.2.145.232', type: 'windows' },
  { id: 24300, name: '10.2.145.231', type: 'windows' }
];
const defaultList = [10050];
</script>
