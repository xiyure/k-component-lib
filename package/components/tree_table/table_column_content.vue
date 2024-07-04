<template>
  <span v-if="props.col.showIcon && props.row.icon">
    <component 
      :is="row.icon"
      :style="{ marginRight: '3px'}"
      :color="row.iconStyle?.empty ? '#cdcacf' : row.iconStyle?.color"
      :size="row.iconStyle?.size ?? 13"
    />
  </span>
  <span v-if="!col.type">
    {{ row[col.field] === '' ? '-' : row[col.field] ?? '-' }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  row: {
    type: Object,
    default: {}
  },
  col: {
    type: Object,
    default: {}
  }
});
</script>