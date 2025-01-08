<template>
  <k-select v-model="value" placeholder="Select" style="width: 240px">
    <k-option-group
      v-for="group in options"
      :key="group.label"
      :label="group.label"
    >
      <k-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </k-option-group>
  </k-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const options = [
  {
    label: 'Popular cities',
    options: [
      {
        value: 'Shanghai',
        label: 'Shanghai'
      },
      {
        value: 'Beijing',
        label: 'Beijing'
      }
    ]
  },
  {
    label: 'City name',
    options: [
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
      },
      {
        value: 'Dalian',
        label: 'Dalian'
      }
    ]
  }
];
</script>
