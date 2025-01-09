<template>
  <k-button :plain="true" @click="open1">Success</k-button>
  <k-button :plain="true" @click="open2">Warning</k-button>
  <k-button :plain="true" @click="open3">Message</k-button>
  <k-button :plain="true" @click="open4">Error</k-button>
</template>

<script lang="ts" setup>
import { KMessage } from '@ksware/ksw-ux';

const open1 = () => {
  KMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
    plain: true
  });
};
const open2 = () => {
  KMessage({
    message: 'Warning, this is a warning message.',
    type: 'warning',
    plain: true
  });
};
const open3 = () => {
  KMessage({
    message: 'This is a message.',
    type: 'info',
    plain: true
  });
};
const open4 = () => {
  KMessage({
    message: 'Oops, this is a error message.',
    type: 'error',
    plain: true
  });
};
</script>
