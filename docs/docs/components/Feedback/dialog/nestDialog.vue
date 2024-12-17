<template>
  <k-button plain @click="outerVisible = true">
    Open the outer Dialog
  </k-button>

  <k-dialog v-model="outerVisible" title="Outer Dialog" width="800">
    <span>This is the outer Dialog</span>
    <k-dialog
      v-model="innerVisible"
      width="500"
      title="Inner Dialog"
      append-to-body
    >
      <span>This is the inner Dialog</span>
    </k-dialog>
    <template #footer>
      <div class="dialog-footer">
        <k-button @click="outerVisible = false">Cancel</k-button>
        <k-button type="primary" main @click="innerVisible = true">
          Open the inner Dialog
        </k-button>
      </div>
    </template>
  </k-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const outerVisible = ref(false);
const innerVisible = ref(false);
</script>