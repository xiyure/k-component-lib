<template>
  <k-rate
    v-model="value"
    disabled
    show-score
    text-color="#ff9900"
    score-template="{value} 分"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(3.7);
</script>
