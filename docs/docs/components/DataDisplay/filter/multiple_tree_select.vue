<template>
  <k-filter
    :options="options"
    filter-key="value"
    @confirm="handleConfirm"
  ></k-filter>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { KMessage, ConditionInfo } from '@ksware/ksw-ux';

const treeSelectData = [
  {
    value: 'A',
    label: 'A',
    children: [
      { value: 'PM', label: 'PM' }]
  },
  {
    value: 'B',
    label: 'B',
    children: [
      { label: 'Develop', value: 'Develop' }
    ]
  },
  {
    value: 'C',
    label: 'C',
    children: [
     { label: 'Designer', value: 'Designer' }
    ]
  }
];
const options = ref([
  { title: 'Role', value: 'role', dataType: 'string', multiple: 'select', options: treeSelectData }
]);

const handleConfirm = ({ conditionList = [] }: ConditionInfo) => {
  const res = conditionList.map((item) => `current condition:\n ${item.title} ${item.showValue} ${item.logic} ${item.value}\n`)
  KMessage.success(`您选择的日期是：${res}`);
}

</script>