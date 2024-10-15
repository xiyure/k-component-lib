<template>
  <div class="mb-2 ml-4">
    <k-radio-group v-model="radio1">
      <k-radio value="1" size="large">Option 1</k-radio>
      <k-radio value="2" size="large">Option 2</k-radio>
    </k-radio-group>
  </div>
  <div class="my-2 ml-4">
    <k-radio-group v-model="radio2">
      <k-radio value="1">Option 1</k-radio>
      <k-radio value="2">Option 2</k-radio>
    </k-radio-group>
  </div>
  <div class="my-4 ml-4">
    <k-radio-group v-model="radio3">
      <k-radio value="1" size="small">Option 1</k-radio>
      <k-radio value="2" size="small">Option 2</k-radio>
    </k-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio1 = ref('1');
const radio2 = ref('1');
const radio3 = ref('1');
</script>
