<template>
  <KInput
    v-model="textarea1"
    style="width: 240px"
    autosize
    type="textarea"
    placeholder="请输入..."
  />
  <div style="margin: 20px 0" />
  <KInput
    v-model="textarea2"
    style="width: 240px"
    :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"
    placeholder="请输入..."
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const textarea1 = ref('');
const textarea2 = ref('');
</script>
