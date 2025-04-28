<template>
  <k-filter
    :options="options"
    filter-key="value"
  ></k-filter>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const options = ref([
  {
    title: '标题',
    value: 'title',
    dataType: 'number'
  },
  {
    title: '优先级',
    value: 'grade',
    dataType: 'number'
  }
]);
</script>