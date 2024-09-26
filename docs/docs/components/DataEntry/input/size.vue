<template>
  <div class="flex gap-4 mb-4 items-center">
    <KInput
      v-model="input1"
      style="width: 240px"
      size="lg"
      placeholder="请输入..."
    />
    <KInput
      v-model="input2"
      style="width: 240px"
      placeholder="请输入..."
    />
    <KInput
      v-model="input3"
      style="width: 240px"
      size="sm"
      placeholder="请输入..."
    />
  </div>
  <div class="flex gap-4 mb-4 items-center">
    <KInput
      v-model="input1"
      style="width: 240px"
      size="lg"
      placeholder="请输入..."
      suffix-icon="IconSearch"
    />
    <KInput
      v-model="input2"
      style="width: 240px"
      placeholder="请输入..."
      :suffix-icon="IconSearch"
    />
    <KInput
      v-model="input3"
      style="width: 240px"
      size="sm"
      placeholder="请输入..."
      suffix-icon="IconSearch"
    />
  </div>
  <div class="flex gap-4 items-center">
    <KInput
      v-model="input1"
      style="width: 240px"
      size="lg"
      placeholder="请输入..."
      prefix-icon="IconSearch"
    />
    <KInput
      v-model="input2"
      style="width: 240px"
      placeholder="请输入..."
      prefix-icon="IconSearch"
    />
    <KInput
      v-model="input3"
      style="width: 240px"
      size="sm"
      placeholder="请输入..."
      prefix-icon="IconSearch"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
</script>