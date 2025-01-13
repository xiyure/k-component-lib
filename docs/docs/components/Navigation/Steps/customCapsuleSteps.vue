<template>
  <k-steps
    capsule style="max-width: 600px" :active="active"
    :height="60"
  >
    <k-step
      v-for="item in [
        { title: 'Step 1', color: 'orange' },
        { title: 'Step 2', color: 'red' },
      ]"
      :key="item"
      :title="item.title"
      :color="item.color"
    />
  </k-steps>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(0);
</script>
