<template>
  <KInput
    v-model="textarea"
    style="width: 240px"
    :rows="2"
    type="textarea"
    placeholder="请输入..."
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const textarea = ref('');
</script>