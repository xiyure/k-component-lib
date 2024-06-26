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
import { ref, provide, onMounted, computed, getCurrentInstance } from 'vue';
import { VxeColumnProps, VxeTableInstance } from 'vxe-table';

const DESC_EVENT_NAME = 'desc-change';
const HIDE_COLUMN = 'hide-column';

defineOptions({
  name: 'KTable'
});

onMounted(() => {
  const emitter = getCurrentInstance()?.appContext.app.config.globalProperties.__emitter__;
  emitter.on(DESC_EVENT_NAME, updateDescription.bind(this));
  emitter.on(HIDE_COLUMN, hideColumn.bind(this));
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

const tableInstance = computed(() => vxeTableRef.value);
defineExpose({
  tableInstance
});
</script>

<style lang="less">
@import './style.less';
</style>