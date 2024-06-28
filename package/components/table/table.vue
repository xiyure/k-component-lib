<template>
  <vxe-table
    ref="vxeTableRef"
    class="k-table"
    :show-overflow="props.showOverflow"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </vxe-table>
</template>

<script setup lang="ts">
import { ref, provide, computed, getCurrentInstance, onUnmounted } from 'vue';
import { VxeColumnProps, VxeTableInstance } from 'vxe-table';
import { KTableProps } from './type.d';
import { genRandomStr } from '../../utils';

const DESC_EVENT_NAME = 'desc-change';
const HIDE_COLUMN = 'hide-column';

defineOptions({
  name: 'KTable'
});

const props = withDefaults(defineProps<KTableProps>(), {
  showOverflow: true
});

const id = genRandomStr(8);
const emitter = getCurrentInstance()?.appContext.app.config.globalProperties.__emitter__;
emitter.on(DESC_EVENT_NAME, id, updateDescription.bind(this));
emitter.on(HIDE_COLUMN, id, hideColumn.bind(this));

onUnmounted(() => {
  emitter.remove(DESC_EVENT_NAME, id);
  emitter.remove(HIDE_COLUMN, id);
});

const emits = defineEmits(['desc-change', 'hide-column']);
const vxeTableRef = ref<VxeTableInstance>();

function updateDescription(column:VxeColumnProps, desc:string) {
  emits(DESC_EVENT_NAME, column, desc);
}
function hideColumn(column: VxeColumnProps) {
  emits(HIDE_COLUMN, column);
}
provide('tableInstance', vxeTableRef);
provide('tableId', id);

const tableInstance = computed(() => vxeTableRef.value);
defineExpose({
  tableInstance
});
</script>

<style lang="less">
@import './style.less';
</style>