<template>
  <component 
    :is="displayIcon(row)"
    v-if="props.col.showIcon && (row.icon || row.__folder)"
    :style="{ marginRight: `${row.iconStyle?.marginRight ?? 3}px`}"
    :color="row.iconStyle?.empty ? '#cdcacf' : row.iconStyle?.color"
    :size="row.iconStyle?.size ?? 13"
  />
  <span v-if="!col.type">
    {{ row[col.field] === '' ? '-' : row[col.field] ?? '-' }}
  </span>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';

const tableInstance: any = inject('tableInstance');
const props = defineProps({
  row: {
    type: Object,
    default: () => {}
  },
  col: {
    type: Object,
    default: () => {}
  }
});

const displayIcon = computed(() => (row) => {
  if (!row.__folder) {
    return row.icon;
  }
  return tableInstance.value?.isTreeExpandByRow(row) ? 'IconFolderOpen' : 'IconFlowNested';
});
</script>