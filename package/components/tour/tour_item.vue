<template>
  <el-tour-step
    v-bind="$attrs"
  >
    <slot></slot>
    <template v-if="slots.header" #header>
      <slot name="header"></slot>
    </template>
  </el-tour-step>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

defineOptions({
  name: 'KTourItem'
});

const slots = useSlots();
</script>