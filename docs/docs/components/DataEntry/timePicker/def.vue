<template>
  <div class="example-basic">
    <k-time-picker v-model="value1" class="k-date-editor" placeholder="Arbitrary time" />
    <k-time-picker
      v-model="value2"
      class="k-date-editor"
      arrow-control
      placeholder="Arbitrary time"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref();
const value2 = ref();
</script>

<style>
.example-basic .k-date-editor {
  margin: 8px;
}
</style>
