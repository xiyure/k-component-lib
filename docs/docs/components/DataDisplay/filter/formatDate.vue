<template>
  <k-filter
    :options="options"
    :data="data"
    formatter="YYYY MM"
    filter-key="value"
  ></k-filter>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const options = ref([
  {
    title: '时间',
    value: 'timeDate',
    dataType: 'date'
  }
]);

const data = ref([
  {
    timeDate: new Date()
  }
]);
</script>