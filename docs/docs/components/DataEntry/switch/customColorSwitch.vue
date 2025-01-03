<template>
  <k-switch v-model="value1" activeColor="red" inactiveColor="orange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(true);
const value2 = ref(true);
</script>
