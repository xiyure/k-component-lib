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

const options = ref([
  {
    title: 'Date',
    value: 'timeDate',
    dataType: 'date',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
  }
]);

const handleConfirm = ({ conditionList }: ConditionInfo) => {
  const date = conditionList?.[0]?.value ?? [] as any[];
  KMessage.success(`您选择的日期是：${Array.isArray(date)? date.join('-') : date}`);
}

</script>