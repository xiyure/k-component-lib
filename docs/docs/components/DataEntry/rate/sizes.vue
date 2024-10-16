<template>
  <k-rate v-model="value" size="large" />
  <br />
  <k-rate v-model="value" />
  <br />
  <k-rate v-model="value" size="small" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
</script>
