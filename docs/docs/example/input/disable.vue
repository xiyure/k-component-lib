<template>
  <KInput
    v-model="input"
    style="width: 240px"
    disabled
    placeholder="请输入..."
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>