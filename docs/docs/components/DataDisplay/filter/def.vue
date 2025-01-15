<template>
  <k-filter
    :options="options"
    :data="data"
    filter-key="value"
  ></k-filter>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const options = ref([
  {
    title: '标题',
    value: 'title',
    dataType: 'number',
    options: [
      {
        label: '22',
        value: 22
      },
      {
        label: '23',
        value: 23
      }
    ]
  },
  {
    title: '优先级',
    value: 'grade',
    dataType: 'number',
    options: [
      {
        label: '1',
        value: 1
      },
      {
        label: '2',
        value: 2
      }
    ]
  }
]);

const data = ref([
  {
    title: 22,
    grade: 1
  },
  {
    title: 23,
    grade: 2
  }
]);
</script>