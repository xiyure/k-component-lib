<template>
  <k-upload
    class="upload-demo"
    drag
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    multiple
  >
    <template #trigger>
      <IconRPAWebAutomationUpLoadFileColor :size="64"/>
    </template>
    <template #tip>
      <div class="k-upload__tip">jpg/png files with a size less than 500kb</div>
    </template>
  </k-upload>
</template>

<script setup lang="ts">
import { IconRPAWebAutomationUpLoadFileColor } from 'ksw-vue-icon/KingAutometa'
</script>
