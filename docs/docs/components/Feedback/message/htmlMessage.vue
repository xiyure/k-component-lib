<template>
  <k-button :plain="true" @click="openHTML">Use HTML string</k-button>
</template>

<script lang="ts" setup>
import { KMessage } from '@ksware/ksw-ux';

const openHTML = () => {
  KMessage({
    dangerouslyUseHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>'
  });
};
</script>
