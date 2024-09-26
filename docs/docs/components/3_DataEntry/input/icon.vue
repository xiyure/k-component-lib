<template>
  <div class="flex gap-4 mb-4">
    <span>使用属性</span>
    <KInput
      v-model="input1"
      style="width: 240px"
      placeholder="选择日期"
      suffix-icon="IconCalendarColor"
    />
    <KInput
      v-model="input2"
      style="width: 240px"
      placeholder="搜索..."
      prefix-icon="IconSearch"
    />
  </div>
  <div class="flex gap-4">
    <span>使用插槽</span>
    <KInput v-model="input3" style="width: 240px" placeholder="选择日期">
      <template #suffix>
        <IconCalendarColor />
      </template>
    </KInput>
    <KInput
      v-model="input4"
      style="width: 240px"
      placeholder="搜索..."
    >
      <template #prefix>
        <IconSearch />
      </template>
    </KInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
const input4 = ref('');
</script>