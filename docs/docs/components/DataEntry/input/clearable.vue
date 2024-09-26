<template>
  <KInput
    v-model="input"
    style="width: 240px"
    placeholder="请输入..."
    clearable
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const input = ref('');
</script>