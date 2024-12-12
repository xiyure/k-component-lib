<template>
  <span v-if="!col.type" class="column-default__content">
    <component
      :is="displayIcon(row)"
      v-if="props.col.showIcon && (row.icon || row.__folder)"
      :color="row.__folder ? '#FAC814' : row.iconStyle?.empty ? '#cdcacf' : row.iconStyle?.color"
      :size="iconSize(row)"
      :grayscale="Boolean(row.iconStyle?.grayscale)"
    />
    <span
      class="column-default__content__text"
      :style="{
        marginLeft:
          (row.icon || row.__folder) && col.showIcon
            ? `${iconSize(row) + (row.iconStyle?.indent ?? 3)}px`
            : 0,
      }"
    >
      <template v-if="$slots[`${col.field ?? ''}-label`]">
        <slot :name="`${col.field ?? ''}-label`" :row="row" :column="col"></slot>
      </template>
      <template v-else-if="typeof col.formatter === 'function'">
        {{ col.formatter({ cellValue: row[col.field], row, column: col }) }}
      </template>
      <template v-else>{{ row[col.field] === '' ? '-' : row[col.field] ?? '-' }}</template>
    </span>
  </span>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';

const tableInstance: any = inject('tableInstance');
const props = defineProps({
  row: {
    type: Object,
    default: () => {},
  },
  col: {
    type: Object,
    default: () => {},
  },
  size: {
    type: String,
    default: 'default',
  },
  align: {
    type: String,
    default: () => 'left',
  },
});
const iconSize = computed(
  () => (row: any) => row.iconStyle?.size ?? (props.size === 'mini' ? 16 : 20),
);
const displayIcon = computed(() => (row: any) => {
  if (!row.__folder) {
    return row.icon;
  }
  return tableInstance.value?.isTreeExpandByRow(row) ? 'IconFolderOpen' : 'IconFlowNested';
});
</script>
<style lang="less"></style>
