<template>
  <div>
    <k-split v-model="splitMin" min="150">
      <template #first>first</template>
      <template #second>second</template>
    </k-split>
    <k-split v-model="splitMax" max="600">
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
