<template>
  <vxe-table
    ref="vxeTableRef"
    class="k-table"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </vxe-table>
</template>

<script setup lang="ts">
import { ref, provide, computed, onMounted, onUnmounted, nextTick, inject } from 'vue';
import { VxeTable, VxeColumnProps, VxeTableInstance } from 'vxe-table';
import domZIndex from 'dom-zindex';
import { KTableProps } from './type';
import { genRandomStr } from '../../utils';

const DESC_EVENT_NAME = 'desc-change';
const HIDE_COLUMN = 'hide-column';

const eventMap: {
  [eventName: string]: {
    name: string,
    callback: (...arg: any) => void
  }
} = {
  descChange: {
    name: 'desc-change',
    callback: updateDescription.bind(this)
  },
  hideColumn: {
    name: 'hide-column',
    callback: hideColumn.bind(this)
  },
  clearFilter: {
    name: 'clear-filter',
    callback: onClearFilter.bind(this)
  }, 
  filterChange: {
    name: 'filter-change',
    callback: onFilterChange.bind(this)
  },
  filterVisible: {
    name: 'filter-visible',
    callback: onFilterVisible.bind(this)
  },
  sortChange: {
    name: 'sort-change',
    callback: onSort.bind(this)
  },
  clearSort: {
    name: 'clear-sort',
    callback: onClearSort.bind(this)
  }
};

defineOptions({
  name: 'KTable'
});

const props = withDefaults(defineProps<KTableProps>(), {});

const id = genRandomStr(8);
// 事件管理
const emitter = inject('_emitter') as any;
for (const key in eventMap) {
  const { name, callback } = eventMap[key];
  emitter.on(name, id, callback);
}

const emits = defineEmits([
  'desc-change',
  'hide-column',
  'sort-change',
  'clear-sort',
  'filter-change',
  'filter-visible',
  'clear-filter'
]);

onMounted(() => {
  initZIndex();
});
const vxeTableRef = ref<VxeTableInstance>();

nextTick(() => {
  if (!tableInstance.value) {
    return;
  }
  tableInstance.value.openFilter = openFilter as any;
  tableInstance.value.closeFilter = closeFilter as any;
});

onUnmounted(() => {
  for (const key in eventMap) {
    const { name } = eventMap[key];
    emitter.remove(name, id);
  }
});
function initZIndex() {
  const maxZIndex = domZIndex.getMax();
  domZIndex.setCurrent(maxZIndex + 1);
}
function updateDescription(column:VxeColumnProps, desc:string) {
  emits(DESC_EVENT_NAME, column, desc);
}
function hideColumn(column: VxeColumnProps) {
  emits(HIDE_COLUMN, column);
}
// 处理筛选面板是否显示
const filterPanelConfig = ref({
  field: '___default___',
  isOpen: false
});
function openFilter(column: VxeColumnProps | string) {
  return new Promise((resolve) => {
    let field = column;
    if (typeof column === 'object') {
      field = column.field ?? '';
    }
    filterPanelConfig.value.field = field as string;
    filterPanelConfig.value.isOpen = true;
    resolve(true);
  });
}
function closeFilter(column: VxeColumnProps | string) {
  return new Promise((resolve) => {
    let field = column;
    if (typeof column === 'object') {
      field = column.field ?? '';
    }
    filterPanelConfig.value.field = field as string;
    filterPanelConfig.value.isOpen = false;
    resolve(true);
  });
}
function onSort(data: any) {
  emits('sort-change', data);
}
function onClearSort(data: any) {
  emits('clear-sort', data);
}
function onFilterChange(data: any) {
  emits('filter-change', data);
}
function onFilterVisible(data: any) {
  emits('filter-visible', data);
}
function onClearFilter(data: any) {
  emits('clear-filter', data);
}

provide('tableInstance', vxeTableRef);
provide('tableId', id);
provide('showColumnMenu', props.showColumnMenu);
provide('filterPanelConfig', filterPanelConfig);
const tableInstance = computed(() => vxeTableRef.value);
defineExpose({
  tableInstance
});
</script>

<style lang="less">
@import './style.less';
// 临时解决方案，vxe-table上游样式问题，重写tooltip样式
@import './tooltip.less';
</style>