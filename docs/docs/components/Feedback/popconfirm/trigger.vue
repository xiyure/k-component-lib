<template>
  <k-popconfirm
    confirm-button-text="Yes"
    cancel-button-text="No"
    icon="IconStatusInfo"
    icon-color="#626AEF"
    title="Are you sure to delete this?"
    @confirm="confirmEvent"
    @cancel="cancelEvent"
  >
    <template #reference>
      <k-button>Delete</k-button>
    </template>
  </k-popconfirm>
</template>

<script setup lang="ts">

const confirmEvent = () => {
  console.log('confirm!');
};
const cancelEvent = () => {
  console.log('cancel!');
};
</script>
