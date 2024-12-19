<template>
  <div class="example-basic">
    <k-time-picker class="k-date-editor" v-model="value1" placeholder="Arbitrary time" />
    <k-time-picker
      class="k-date-editor"
      v-model="value2"
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
