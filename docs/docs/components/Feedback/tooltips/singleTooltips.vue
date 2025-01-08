<template>
  <div>
    <k-button
      v-for="i in 3"
      :key="i"
      @mouseover="(e) => (buttonRef = e.currentTarget)"
      @click="visible = !visible"
    >
      Click to open tooltip
    </k-button>
  </div>

  <k-tooltip
    ref="tooltipRef"
    :visible="visible"
    :popper-options="{
      modifiers: [
        {
          name: 'computeStyles',
          options: {
            adaptive: false,
            enabled: false,
          },
        },
      ],
    }"
    :virtual-ref="buttonRef"
    virtual-triggering
    popper-class="singleton-tooltip"
  >
    <template #content>
      <span> Some content </span>
    </template>
  </k-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const buttonRef = ref();
const tooltipRef = ref();

const visible = ref(false);
</script>

<style>
.singleton-tooltip {
  transition: transform 0.3s var(--k-transition-function-fast-bezier);
}
</style>
