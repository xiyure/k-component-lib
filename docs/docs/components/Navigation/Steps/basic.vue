<template>
  <k-steps style="max-width: 600px" :active="active" finish-status="success">
    <k-step title="Step 1" />
    <k-step title="Step 2" />
    <k-step title="Step 3" />
  </k-steps>

  <k-button style="margin-top: 12px" @click="next" main>下一步</k-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)

const next = () => {
  if (active.value++ > 2) active.value = 0
}
</script>
