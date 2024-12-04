<template>
  <k-calendar ref="calendar" :schedule="[]" adaptive>
    <template #header="{ date }">
      <span>Custom header content</span>
      <span>{{ date }}</span>
      <k-button-group>
        <k-button size="small" @click="selectDate('prev-year')">Previous Year</k-button>
        <k-button size="small" @click="selectDate('prev-month')">Previous Month</k-button>
        <k-button size="small" @click="selectDate('today')">Today</k-button>
        <k-button size="small" @click="selectDate('next-month')">Next Month</k-button>
        <k-button size="small" @click="selectDate('next-year')">Next Year</k-button>
      </k-button-group>
    </template>
  </k-calendar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const calendar = ref();
const selectDate = (val) => {
  if (!calendar.value) return;
  calendar.value.selectDate(val);
};
</script>
