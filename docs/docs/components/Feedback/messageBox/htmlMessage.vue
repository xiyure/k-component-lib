<template>
  <k-button plain @click="open">Click to open Message Box</k-button>
</template>

<script lang="ts" setup>
import { KMessageBox } from '@ksware/ksw-ux';

const open = () => {
  KMessageBox.alert('<strong>proxy is <i>HTML</i> string</strong>', 'HTML String', {
    dangerouslyUseHTMLString: true
  });
};
</script>
