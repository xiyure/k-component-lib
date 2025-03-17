<template>
  <k-button plain @click="open">Click to open the Message Box</k-button>
</template>

<script lang="ts" setup>
import { KMessage, KMessageBox } from '@ksware/ksw-ux';
import type { Action } from 'element-plus';

const open = () => {
  KMessageBox.alert('This is a message', 'Title', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      KMessage({
        type: 'info',
        message: `action: ${action}`
      });
    }
  });
};
</script>
