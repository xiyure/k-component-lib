<template>
  <div class="mb-2 ml-4">
    <k-radio-group v-model="radio1">
      <k-radio value="1" size="large" color="orange">Option 1</k-radio>
      <k-radio value="2" size="large" color="red">Option 2</k-radio>
      <k-radio value="3" size="large" color="green">Option 3</k-radio>
    </k-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio1 = ref('1');
const radio2 = ref('1');
const radio3 = ref('1');
</script>
