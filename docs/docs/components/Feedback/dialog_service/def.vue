<template>
  <k-button main @click="show">点击弹出对话框</k-button>
</template>

<script lang="ts" setup>
import { showDialog } from '@ksware/ksw-ux';

const show = () => {
  showDialog({
    title: 'Title',
    slots: {
      default: () => 'Hello World'
    }
  })
}
</script>