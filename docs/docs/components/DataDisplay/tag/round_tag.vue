<template>
  <div class="flex gap-2">
    <k-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      round
    >
      {{ item.label }}
    </k-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import type { TagProps } from '@ksware/ksw-ux';

type Item = { type: TagProps['type']; label: string }

const items = ref<Array<Item>>([
  { type: 'primary', label: 'Tag 1' },
  { type: 'success', label: 'Tag 2' },
  { type: 'info', label: 'Tag 3' },
  { type: 'warning', label: 'Tag 4' },
  { type: 'danger', label: 'Tag 5' }
]);
</script>
