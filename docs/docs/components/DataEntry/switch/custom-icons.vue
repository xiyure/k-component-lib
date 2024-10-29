<template>
  <k-switch v-model="value1" :active-icon="IconCheck" inactive-icon="IconClose" />
  <br />
  <k-switch
    v-model="value2"
    class="mt-2"
    style="margin-left: 24px"
    inline-prompt
    :active-icon="IconCheck"
    inactive-icon="IconClose"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconCheck } from 'ksw-vue-icon';

const value1 = ref(true);
const value2 = ref(true);
</script>
