<template>
  <vxe-table
    ref="vxeTableRef"
    class="k-table"
    :class="showDragColumn ? 'drag_table' : ''"
    :data="data"
    v-bind="$attrs"
  >
    <vxe-column v-if="showDragColumn" width="25" class="drag-column">
      <template #default>
        <span class="__column-drag-icon">
          <slot name="dragIcon">
            <IconDrag />
          </slot>
        </span>
      </template>
    </vxe-column>
    <slot v-bind="data"></slot>
    <template v-if="slots.empty" #empty="data">
      <slot name="empty" v-bind="data"></slot>
    </template>
    <template v-if="slots.loading" #loading="data">
      <slot name="loading" v-bind="data"></slot>
    </template>
  </vxe-table>
</template>

<script setup lang="ts">
import { ref, provide, computed, getCurrentInstance, onUnmounted, nextTick } from 'vue';
import { VxeColumnProps, VxeTableInstance } from 'vxe-table';
import Sortable from 'sortablejs';
import { IconDrag } from 'ksw-vue-icon';
import { KTableProps } from './type.d';
import { genRandomStr } from '../../utils';

const DESC_EVENT_NAME = 'desc-change';
const HIDE_COLUMN = 'hide-column';

defineOptions({
  name: 'KTable'
});

const props = withDefaults(defineProps<KTableProps>(), {
  showDragColumn: false
});

const slots = defineSlots();
const id = genRandomStr(8);
// 事件管理
const emitter = getCurrentInstance()?.appContext.app.config.globalProperties.__emitter__;
emitter.on(DESC_EVENT_NAME, id, updateDescription.bind(this));
emitter.on(HIDE_COLUMN, id, hideColumn.bind(this));

const emits = defineEmits(['desc-change', 'hide-column', 'drag-end']);
const vxeTableRef = ref<VxeTableInstance>();
// 拖拽
let timer: any;
let sortable: any;
nextTick(() => {
  timer = setTimeout(() => {
    rowDrop();
  }, 500);
  if (!tableInstance.value) {
    return;
  }
  tableInstance.value.openFilter = openFilter as any;
  tableInstance.value.closeFilter = closeFilter as any;
});

onUnmounted(() => {
  emitter.remove(DESC_EVENT_NAME, id);
  emitter.remove(HIDE_COLUMN, id);
  clearTimeout(timer);
  if (sortable) {
    sortable.destroy();
  }
});
function rowDrop() {
  const $table = vxeTableRef.value;
  sortable = Sortable.create($table?.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
    handle: '.__column-drag-icon',
    onEnd: (sortableEvent) => {
      const targetTrElem = sortableEvent.item;
      const prevTrElem = targetTrElem.previousElementSibling as HTMLElement;
      const targetRowNode = vxeTableRef.value?.getRowNode(targetTrElem);
      if (!targetRowNode) {
        return;
      }
      const selfRow = targetRowNode.item;
      const curRowIndex = props.data?.findIndex(row => row.id === selfRow.id) as number;
      const curRow = props.data?.splice(curRowIndex, 1)[0];
      if (prevTrElem) {
      // 移动到节点
        const prevRowNode = vxeTableRef.value?.getRowNode(prevTrElem);
        if (!prevRowNode) {
          return;
        }
        const prevRow = prevRowNode.item;
        const prevRowIndex = props.data?.findIndex(row => row.id === prevRow.id) as number;
        const prevParentRow = vxeTableRef.value?.getRowById(prevRow.parentId);
        if (vxeTableRef.value?.isTreeExpandByRow(prevRow)) {
        // 移动到当前的子节点
          curRow.parentId = prevRow.id;
          props.data?.splice(prevRowIndex + 1, 0, curRow);
        } else if (vxeTableRef.value?.isTreeExpandByRow(prevParentRow)) {
        // 移动到相邻节点
          curRow.parentId = prevRow.parentId ?? null;
          props.data?.splice(prevRowIndex + 1, 0, curRow);
        } else {
          // 移动到父节点的相邻节点
          curRow.parentId = prevParentRow?.parentId ?? null;
          props.data?.splice(prevRowIndex + 1, 0, curRow);
        }
      } else {
      // 移动到第一行
        curRow.parentId = null;
        props.data?.unshift(curRow);
      }
      emits('drag-end', props.data);
      vxeTableRef.value?.reloadData(props.data ?? []);
    }
  });
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
.__column-drag-icon {
  cursor: move;
  font-size: 16px;
}
</style>