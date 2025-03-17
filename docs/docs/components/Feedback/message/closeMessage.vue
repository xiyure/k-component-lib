<template>
  <k-button :plain="true" @click="open1">Message</k-button>
  <k-button :plain="true" @click="open2">Success</k-button>
  <k-button :plain="true" @click="open3">Warning</k-button>
  <k-button :plain="true" @click="open4">Error</k-button>
</template>

<script lang="ts" setup>
import { KMessage } from '@ksware/ksw-ux';

const open1 = () => {
  KMessage({
    showClose: true,
    message: 'This is a message.'
  });
};
const open2 = () => {
  KMessage({
    showClose: true,
    message: 'Congrats, this is a success message.',
    type: 'success'
  });
};
const open3 = () => {
  KMessage({
    showClose: true,
    message: 'Warning, this is a warning message.',
    type: 'warning'
  });
};
const open4 = () => {
  KMessage({
    showClose: true,
    message: 'Oops, this is a error message.',
    type: 'error'
  });
};
</script>
