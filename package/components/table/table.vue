<template>
  <vxe-table
    ref="vxeTableRef"
    class="k-table"
    :class="showDragColumn ? 'drag_table' : ''"
    :show-overflow="props.showOverflow"
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
  showOverflow: true,
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
      let tableData:any[] = [];
      let newIndex: number = sortableEvent.newIndex;
      let oldIndex: number = sortableEvent.oldIndex;
      if (Array.isArray(props.fullData)) {
        tableData = props.fullData;
        const newItem = props.data?.[newIndex];
        const oldItem = props.data?.[oldIndex];
        newIndex = tableData.findIndex(item => item.id === newItem.id);
        oldIndex = tableData.findIndex(item => item.id === oldItem.id);
      } else if (Array.isArray(props.data)) {
        tableData = props.data;
      }
      const currRow = tableData.splice(oldIndex, 1)[0];
      tableData.splice(newIndex, 0, currRow);
      emits('drag-end', tableData);
    }
  });
}
function updateDescription(column:VxeColumnProps, desc:string) {
  emits(DESC_EVENT_NAME, column, desc);
}
function hideColumn(column: VxeColumnProps) {
  emits(HIDE_COLUMN, column);
}
provide('tableInstance', vxeTableRef);
provide('tableId', id);
provide('showColumnMenu', props.showColumnMenu);
const tableInstance = computed(() => vxeTableRef.value);
defineExpose({
  tableInstance
});
</script>

<style lang="less">
@import './style.less';
.__column-drag-icon {
  cursor: move;
  font-size: 16px;
}
</style>