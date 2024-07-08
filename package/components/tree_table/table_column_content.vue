<template>
  <span
    v-if="!col.type"
    class="column-default__content"
    :style="typeof cellStyle === 'function'? cellStyle(row, col) : cellStyle"
    :class="size === 'mini' ? 'column-mini' : 'column-default'"
  >
    <component 
      :is="displayIcon(row)"
      v-if="props.col.showIcon && (row.icon || row.__folder)"
      :style="{ marginRight: `${row.iconStyle?.marginRight ?? 3}px`}"
      :color="row.__folder ? '#FAC814' : row.iconStyle?.empty ? '#cdcacf' : row.iconStyle?.color"
      :size="row.iconStyle?.size ?? (props.size ==='mini'? 16 : 20)"
    />
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
  },
  size: {
    type: String,
    default: 'default'
  },
  cellStyle: {
    type: [Object, Function],
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
<style lang="less" scoped>
.column-mini {
  display: inline-flex;
  line-height: 16px;
  .ksw-icon {
    position: relative;
    margin-right: 3px;
    width: 16px;
    height: 16px;
    svg {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.column-default {
  display: inline-flex;
  line-height: 20px;
  .ksw-icon {
    position: relative;
    margin-right: 3px;
    width: 20px;
    height: 20px;
    svg {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.column-default__content:has(.ksw-icon) {
  margin-top: 0.375rem;
}
</style>