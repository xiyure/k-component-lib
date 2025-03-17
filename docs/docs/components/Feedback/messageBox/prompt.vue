<template>
  <k-button plain @click="open">Click to open Message Box</k-button>
</template>

<script lang="ts" setup>
import { KMessage, KMessageBox } from '@ksware/ksw-ux';

const open = () => {
  KMessageBox.prompt('Please input your e-mail', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern:
      /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: 'Invalid Email'
  })
  .then(({ value }) => {
    KMessage({
      type: 'success',
      message: `Your email is:${value}`
    });
  })
  .catch(() => {
    KMessage({
      type: 'info',
      message: 'Input canceled'
    });
  });
};
</script>
