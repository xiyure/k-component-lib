<template>
  <k-button @click="visible = true">
    Open Drawer with customized header
  </k-button>
  <k-drawer v-model="visible" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
      <k-button type="danger" @click="close">
        <component is="IconClose" />
      </k-button>
    </template>
    This is drawer content.
  </k-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>
