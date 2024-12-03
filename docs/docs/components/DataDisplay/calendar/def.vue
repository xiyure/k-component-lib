<template>
  <k-calendar v-model="value" :schedule="[]" adaptive show-lunar></k-calendar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref(new Date());
</script>
