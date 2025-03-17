<template>
  <k-operate :data="data" :total="1" :max="2"></k-operate>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([
  {
    label: '编辑',
    handler: (item: any) => {
      console.log(item);
    }
  },
  {
    label: '删除',
    handler: (item: any) => {
      console.log(item);
    }
  },
  {
    label: '查看',
    handler: (item: any) => {
      console.log(item);
    }
  }
]);
</script>