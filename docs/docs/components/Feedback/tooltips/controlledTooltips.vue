<template>
  <k-tooltip :visible="visible">
    <template #content>
      <span>Content</span>
    </template>
    <k-button @mouseenter="visible = true" @mouseleave="visible = false">
      Hover me
    </k-button>
  </k-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>
