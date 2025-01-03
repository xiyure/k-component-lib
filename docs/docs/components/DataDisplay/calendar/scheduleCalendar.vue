<template>
  <k-calendar v-model="value" :schedule="[{date: '2025-01-01', content: ['节假日']}]"></k-calendar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(new Date());
</script>
