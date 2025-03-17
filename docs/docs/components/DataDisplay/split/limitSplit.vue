<template>
  <div>
    <k-split v-model="splitMin" min="150" max="600" style="height: 200px;">
      <template #first>first</template>
      <template #second>second</template>
    </k-split>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';

const splitMin = ref(0.3);
const splitMax = ref(0.3);
</script>
<style scoped></style>
