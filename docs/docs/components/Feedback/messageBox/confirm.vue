<template>
  <k-button plain @click="open">Click to open the Message Box</k-button>
</template>

<script lang="ts" setup>
import { KMessage, KMessageBox } from '@ksware/ksw-ux';

const open = () => {
  KMessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
  .then(() => {
    KMessage({
      type: 'success',
      message: 'Delete completed'
    });
  })
  .catch(() => {
    KMessage({
      type: 'info',
      message: 'Delete canceled'
    });
  });
};
</script>
