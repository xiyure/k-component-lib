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

const selectData = [
  { value: 'PM', label: 'PM' },
  { label: 'Develop', value: 'Develop' },
  { label: 'Designer', value: 'Designer' }
];

const options = ref([
  { title: 'Role', value: 'role', dataType: 'string', multiple: 'select', options: selectData }
]);

const handleConfirm = ({ conditionList = [] }: ConditionInfo) => {
  const res = conditionList.map((item) => `current condition:\n ${item.title} ${item.showValue} ${item.logic} ${item.value}\n`)
  KMessage.success(`您选择的日期是：${res}`);
}

</script>