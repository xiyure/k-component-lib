<template>
  <k-steps capsule style="max-width: 600px" :active="active">
    <k-step v-for="item in ['Step 1', 'Step 2']" :key="item" :title="item" />
  </k-steps>

  <k-button style="margin-top: 12px" main @click="next">下一步</k-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(0);

const next = () => {
  if (active.value++ > 2) active.value = 0;
};
</script>
