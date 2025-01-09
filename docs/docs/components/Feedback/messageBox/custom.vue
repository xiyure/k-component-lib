<template>
  <k-button plain @click="open">Click to open Message Box</k-button>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { KMessage, KMessageBox } from '@ksware/ksw-ux';

const open = () => {
  KMessageBox({
    title: 'Message',
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ]),
    showCancelButton: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = 'Loading...';
        setTimeout(() => {
          done();
          setTimeout(() => {
            instance.confirmButtonLoading = false;
          }, 300);
        }, 3000);
      } else {
        done();
      }
    }
  }).then((action) => {
    KMessage({
      type: 'info',
      message: `action: ${action}`
    });
  });
};
</script>
