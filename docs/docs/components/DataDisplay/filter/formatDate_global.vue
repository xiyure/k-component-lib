<template>
  <k-filter
    :options="options"
    date-format="YYYY MM"
    filter-key="value"
    @confirm="handleConfirm"
  ></k-filter>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { KMessage, ConditionInfo } from '@ksware/ksw-ux';

const options = ref([
  {
    title: '时间',
    value: 'timeDate',
    dataType: 'date'
  }
]);

const handleConfirm = ({ conditionList }: ConditionInfo) => {
  const date = conditionList?.[0]?.value ?? [] as any[];
  KMessage.success(`您选择的日期是：${Array.isArray(date)? date.join('-') : date}`);
}

</script>