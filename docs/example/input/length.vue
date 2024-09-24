<template>
  <KInput
    v-model="text"
    style="width: 240px"
    maxlength="10"
    placeholder="请输入..."
    show-word-limit
    type="text"
  />
  <div style="margin: 20px 0" />
  <KInput
    v-model="textarea"
    maxlength="30"
    style="width: 240px"
    placeholder="请输入..."
    show-word-limit
    type="textarea"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const text = ref('')
const textarea = ref('')
</script>