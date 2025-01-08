<template>
  <k-select v-model="value" placeholder="Select" style="width: 240px">
    <k-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span style="float: left">{{ item.label }}</span>
      <span
        style="
          float: right;
          color: var(--k-text-color-secondary);
          font-size: 13px;
        "
      >{{ item.value }}</span>
    </k-option>
  </k-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const cities = [
  {
    value: 'Beijing',
    label: 'Beijing'
  },
  {
    value: 'Shanghai',
    label: 'Shanghai'
  },
  {
    value: 'Nanjing',
    label: 'Nanjing'
  },
  {
    value: 'Chengdu',
    label: 'Chengdu'
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen'
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou'
  }
];
</script>
