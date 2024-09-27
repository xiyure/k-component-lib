<template>
  <k-space direction="vertical">
    <k-space>
      <k-input-number v-model="num" />
      <k-input-number v-model="num">
        <template #decrease-icon>
            <IconArrowBottom />
        </template>
        <template #increase-icon>
            <IconArrowTop />
        </template>
      </k-input-number>
    </k-space>
    <k-space>
      <k-input-number v-model="num" controls-position="right" />
      <k-input-number v-model="num" controls-position="right">
        <template #decrease-icon>
            <IconAdd />
        </template>
        <template #increase-icon>
            <IconAdd />
        </template>
      </k-input-number>
    </k-space>
  </k-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
</script>
