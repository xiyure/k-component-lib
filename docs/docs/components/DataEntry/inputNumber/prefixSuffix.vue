<template>
  <k-space>
    <k-input-number v-model="num" :min="1" :max="10">
      <template #prefix>
        <span>￥</span>
      </template>
    </k-input-number>
    <k-input-number v-model="num" :min="1" :max="10">
      <template #suffix>
        <span>RMB</span>
      </template>
    </k-input-number>
  </k-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const num = ref(1)
</script>
