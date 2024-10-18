<template>
  <k-checkbox v-model="checked1" class="mr-4" disabled>Disabled</k-checkbox>
  <k-checkbox v-model="checked2">Not disabled</k-checkbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checked1 = ref(false);
const checked2 = ref(true);
</script>
