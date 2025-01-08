<template>
  <k-button
    type="primary" main style="margin-left: 16px"
    @click="drawer = true"
  >
    open
  </k-button>

  <k-drawer v-model="drawer" title="I am the title" :with-header="false">
    <span>Hi there!</span>
  </k-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const drawer = ref(false);
</script>
