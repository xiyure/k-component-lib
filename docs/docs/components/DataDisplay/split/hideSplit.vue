<template>
  <div>
    <k-split v-model="split" :showTrigger="false">
      <template #first>first</template>
      <template #second>second</template>
    </k-split>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';

const split = ref(0.3);
</script>
<style scoped></style>
