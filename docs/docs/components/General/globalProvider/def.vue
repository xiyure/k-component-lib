<template>
  <k-button type="primary" main @click="toggle">Global Provider</k-button>
  <k-global-provider :locale="locale">
    <div :style="{ height: '420px' }">
      <k-tree-table :data="tableData" :column="column"></k-tree-table>
    </div>
  </k-global-provider>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const zhTableData = [
  {
    id: '1',
    name: '测试1'
  },
  {
    id: '2',
    name: '测试2'
  }
];

const enTableData = [
  {
    id: '1',
    name: 'Test1'
  },
  {
    id: '2',
    name: 'Test2'
  }
];

let locale = ref('en');
let tableData = ref(enTableData);

const toggle = () => {
  locale.value = locale.value === 'en' ? 'zh' : 'en';
  tableData.value = locale.value === 'en' ? enTableData : zhTableData;
};

const column = ref([
  {
    title: 'Id',
    field: 'id'
  },
  {
    title: 'Name',
    field: 'name'
  }
]);
</script>
<style scoped></style>
