<template>
  <k-button plain @click="open">Click to open Message Box</k-button>
</template>

<script lang="ts" setup>
import { KMessage, KMessageBox } from '@ksware/ksw-ux';
import type { Action } from 'element-plus';

const open = () => {
  KMessageBox.confirm('You have unsaved changes, save and proceed?', 'Confirm', {
    distinguishCancelAndClose: true,
    confirmButtonText: 'Save',
    cancelButtonText: 'Discard Changes'
  })
  .then(() => {
    KMessage({
      type: 'info',
      message: 'Changes saved. Proceeding to a new route.'
    });
  })
  .catch((action: Action) => {
    KMessage({
      type: 'info',
      message:
        action === 'cancel' ? 'Changes discarded. Proceeding to a new route.' : 'Stay in the current route'
    });
  });
};
</script>
