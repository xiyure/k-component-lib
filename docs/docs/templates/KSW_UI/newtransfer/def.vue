<template>
  <KNewTransfer
    :treeTransferData="treeTransferData"
    :defaultData="defaultList"
    defaultVal="windows"
    title="选择目标服务器"
    :selectList="[
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
let treeTransferData = [
  { id: 10000, name: '10.2.145.233', type: 'windows' },
  { id: 10050, name: '10.2.145.232', type: 'windows' },
  { id: 24300, name: '10.2.145.231', type: 'windows' },
];
let defaultList = [10050];
</script>
