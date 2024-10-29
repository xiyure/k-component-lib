<template>
  <k-switch
    v-model="value"
    size="lg"
    active-text="Open"
    inactive-text="Close"
  />
  <br />
  <k-switch v-model="value" active-text="Open" inactive-text="Close" />
  <br />
  <k-switch
    v-model="value"
    size="sm"
    active-text="Open"
    inactive-text="Close"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(true);
</script>
