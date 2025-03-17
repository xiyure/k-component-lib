<template>
  <k-button ref="btnRef" type="primary" @click="open = true" main>
    Begin Tour
  </k-button>

  <k-tour v-model="open">
    <k-tour-step
      title="Center"
      description="Displayed in the center of screen."
    />
    <k-tour-step
      title="Right"
      description="On the right of target."
      placement="right"
      :target="btnRef?.$el"
    />
    <k-tour-step
      title="Top"
      description="On the top of target."
      placement="top"
      :target="btnRef?.$el"
    />
  </k-tour>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const btnRef = ref()

const open = ref(false)
</script>
