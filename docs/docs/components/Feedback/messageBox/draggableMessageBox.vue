<template>
  <k-button plain @click="open">Open a draggable Message Box</k-button>
  <k-button plain @click="open2">Open a overflow draggable Message Box</k-button>
</template>

<script lang="ts" setup>
import { KMessage, KMessageBox } from '@ksware/ksw-ux';

const open = () => {
  KMessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
    draggable: true
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

const open2 = () => {
  KMessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
    draggable: true,
    overflow: true
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
