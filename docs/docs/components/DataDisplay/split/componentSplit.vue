<template>
  <div>
    <k-split v-model="split" component="span">
      <template #first>first</template>
      <template #second>second</template>
    </k-split>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';

const split = ref(0.5);
</script>
<style scoped></style>
