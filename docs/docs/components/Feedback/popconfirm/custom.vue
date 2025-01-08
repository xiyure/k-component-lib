<template>
  <k-popconfirm
    width="220"
    icon="IconStatusInfo"
    icon-color="#626AEF"
    title="Are you sure to delete this?"
    @cancel="onCancel"
  >
    <template #reference>
      <k-button>Delete</k-button>
    </template>
    <template #actions="{ confirm, cancel }">
      <k-button size="small" @click="cancel">No!</k-button>
      <k-button type="danger" size="small" :disabled="!clicked" @click="confirm">Yes?</k-button>
    </template>
  </k-popconfirm>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const clicked = ref(false);
function onCancel() {
  clicked.value = true;
}
</script>
