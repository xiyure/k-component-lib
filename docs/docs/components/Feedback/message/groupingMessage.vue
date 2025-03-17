<template>
  <k-button :plain="true" @click="open">Show message</k-button>
</template>

<script lang="ts" setup>
import { KMessage } from '@ksware/ksw-ux';

const open = () => {
  KMessage({
    message: 'This is a message.',
    grouping: true,
    type: 'success'
  });
};
</script>
