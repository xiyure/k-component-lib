<template>
  <div class="flex gap-2">
    <k-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      :color="item.color"
      effect="dark"
    >
      {{ item.label }}
    </k-tag>
  </div>
  <div class="flex gap-2 mt-4">
    <k-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      :color="item.color"
      effect="light"
    >
      {{ item.label }}
    </k-tag>
  </div>
  <div class="flex gap-2 mt-4">
    <k-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      :color="item.color"
      effect="plain"
    >
      {{ item.label }}
    </k-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import type { KTagProps } from '@ksware/ksw-ux';

type Item = { type?: KTagProps['type']; label: string, color?: string }

const items = ref<Array<Item>>([
  { type: 'primary', label: 'Tag 1' },
  { type: 'success', label: 'Tag 2' },
  { type: 'info', label: 'Tag 3' },
  { type: 'warning', label: 'Tag 4' },
  { type: 'danger', label: 'Tag 5' },
  { color: '#5bc0de', label: 'Tag 6' }
]);
</script>
