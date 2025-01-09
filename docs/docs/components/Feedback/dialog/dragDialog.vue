<template>
  <k-button plain @click="dialogVisible = true">
    Open a draggable Dialog
  </k-button>

  <k-button plain @click="dialogOverflowVisible = true">
    Open a overflow draggable Dialog
  </k-button>

  <k-dialog
    v-model="dialogVisible" title="Tips" width="500"
    draggable
  >
    <span>It's a draggable Dialog</span>
    <template #footer>
      <div class="dialog-footer">
        <k-button @click="dialogVisible = false">Cancel</k-button>
        <k-button type="primary" main @click="dialogVisible = false">
          Confirm
        </k-button>
      </div>
    </template>
  </k-dialog>

  <k-dialog
    v-model="dialogOverflowVisible"
    title="Tips"
    width="500"
    draggable
    overflow
  >
    <span>It's a overflow draggable Dialog</span>
    <template #footer>
      <div class="dialog-footer">
        <k-button @click="dialogOverflowVisible = false">Cancel</k-button>
        <k-button type="primary" main @click="dialogOverflowVisible = false">
          Confirm
        </k-button>
      </div>
    </template>
  </k-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible = ref(false);
const dialogOverflowVisible = ref(false);
</script>