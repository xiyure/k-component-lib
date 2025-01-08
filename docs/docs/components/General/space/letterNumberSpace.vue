<template>
  <k-space :size="size" spacer="|">
    <div v-for="i in 2" :key="i">
      <k-button> button {{ i }} </k-button>
    </div>
  </k-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const size = ref(10);
</script>
