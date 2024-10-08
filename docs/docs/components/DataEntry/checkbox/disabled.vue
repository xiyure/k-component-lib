<template>
  <k-checkbox class="mr-4" v-model="checked1" disabled>Disabled</k-checkbox>
  <k-checkbox v-model="checked2">Not disabled</k-checkbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const checked1 = ref(false)
const checked2 = ref(true)
</script>
