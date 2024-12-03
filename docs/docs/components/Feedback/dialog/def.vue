<template>
  <k-button plain @click="dialogVisible = true">
    Click to open the Dialog
  </k-button>

  <k-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <k-button @click="dialogVisible = false">Cancel</k-button>
        <k-button type="primary" main @click="dialogVisible = false">
          Confirm
        </k-button>
      </div>
    </template>
  </k-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { KMessageBox } from '@ksware/ksw-ux';

const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  KMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>