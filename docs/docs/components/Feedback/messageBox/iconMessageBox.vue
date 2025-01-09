<template>
  <k-button plain @click="open">Click to open Message Box</k-button>
</template>

<script lang="ts" setup>
import { markRaw } from 'vue';
import { KMessageBox } from '@ksware/ksw-ux';
import { IconDelete } from 'ksw-vue-icon';

const open = () => {
  KMessageBox.confirm('It will permanently delete the file. Continue?', 'Warning', {
    type: 'warning',
    icon: markRaw(IconDelete)
  });
};
</script>
