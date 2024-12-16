<template>
  <k-button plain @click="centerDialogVisible = true">
    Click to open the Dialog
  </k-button>

  <k-dialog
    v-model="centerDialogVisible"
    title="Warning"
    width="500"
    align-center
  >
    <span>Open the dialog from the center from the screen</span>
    <template #footer>
      <div class="dialog-footer">
        <k-button @click="centerDialogVisible = false">Cancel</k-button>
        <k-button type="primary" main @click="centerDialogVisible = false">
          Confirm
        </k-button>
      </div>
    </template>
  </k-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const centerDialogVisible = ref(false);
</script>