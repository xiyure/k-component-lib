<template>
  <k-button plain @click="visible = true">
    Open Dialog with customized header
  </k-button>

  <k-dialog v-model="visible" :show-close="false" width="500">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
        <k-button type="danger" main @click="close">
          <k-icon class="k-icon--left"><IconClose /></k-icon>
          Close
        </k-button>
      </div>
    </template>
    This is dialog content.
  </k-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}
</style>