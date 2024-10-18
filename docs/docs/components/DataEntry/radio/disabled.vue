<template>
  <k-radio v-model="radio" disabled value="disabled">Option A</k-radio>
  <k-radio v-model="radio" disabled value="selected and disabled">
    Option B
  </k-radio>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio = ref('selected and disabled');
</script>
