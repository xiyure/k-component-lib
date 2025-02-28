<template>
  <div>
    <k-split v-model="split" style="height: 200px">
      <template #first>first</template>
      <template #second>
        <k-split v-model="splitVertical" style="height: 200px"  direction="vertical">
          <template #first>second</template>
          <template #second>three</template>
        </k-split>
      </template>
    </k-split>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';

const split = ref(0.3);
const splitVertical = ref(0.5);
</script>
<style scoped></style>
