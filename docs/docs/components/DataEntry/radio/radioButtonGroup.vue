<template>
  <k-radio-group v-model="radio">
    <k-radio :value="3">Option A</k-radio>
    <k-radio :value="6">Option B</k-radio>
    <k-radio :value="9">Option C</k-radio>
  </k-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio = ref(3)
</script>
