<template>
  <k-button plain @click="centerDialogVisible = true">
    Click to open Dialog
  </k-button>

  <k-dialog
    v-model="centerDialogVisible"
    title="Notice"
    width="500"
    destroy-on-close
    center
  >
    <span>
      Notice: before dialog gets opened for the first time this node and the one
      bellow will not be rendered
    </span>
    <div>
      <strong>Extra content (Not rendered)</strong>
    </div>
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