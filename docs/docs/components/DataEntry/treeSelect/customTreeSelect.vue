<template>
  <k-tree-select v-model="value" :data="data" style="width: 240px">
    <template #default="{ data: { label } }">
      {{ label }}<span style="color: gray">(suffix)</span>
    </template>
  </k-tree-select>
  <k-divider />
  use render content:
  <k-tree-select
    v-model="value"
    :data="data"
    :render-content="renderContent"
    style="width: 240px"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref();

const renderContent = (h, { data }) => h(
  'span',
  {
    style: {
      color: '#626AEF'
    }
  },
  data.label
);

const data = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1'
          }
        ]
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1'
          }
        ]
      }
    ]
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1'
          }
        ]
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1'
          }
        ]
      }
    ]
  }
];
</script>
