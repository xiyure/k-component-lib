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

  <k-button style="margin-top: 12px" main @click="next">下一步</k-button>
</template>

<script lang="ts" setup>
import { title } from 'process';
import { ref } from 'vue';

const active = ref(0);

const next = () => {
  if (active.value++ > 2) active.value = 0;
};
</script>
