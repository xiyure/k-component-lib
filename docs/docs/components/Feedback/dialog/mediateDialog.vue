<template>
  <k-button plain @click="centerDialogVisible = true">
    Click to open the Dialog
  </k-button>

  <k-dialog v-model="centerDialogVisible" title="Warning" width="500" center>
    <span>
      It should be noted that the content will not be aligned in center by
      default
    </span>
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
import { ref } from 'vue'

const centerDialogVisible = ref(false)
</script>