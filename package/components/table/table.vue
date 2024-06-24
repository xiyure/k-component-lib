<template>
  <vxe-table
    ref="vxeTableRef"
    class="k-table"
    v-bind="props"
    v-on="listeners"
  >
    <slot></slot>
    <template v-if="slots.loading" #loading>
      <slot name="loading"></slot>
    </template>
    <template v-if="slots.empty" #empty>
      <slot name="empty"></slot>
    </template>
  </vxe-table>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, computed, getCurrentInstance } from 'vue';
import { VxeTableProps, VxeColumnProps, VxeTableInstance } from 'vxe-table';
import { getListeners } from '../../utils';

const DESC_EVENT_NAME = 'desc-change';

defineOptions({
  name: 'KTable'
});

const props = withDefaults(defineProps<VxeTableProps>(), {
  border: true,
  showHeader: true,
  fit: true
});
onMounted(() => {
  const emitter = getCurrentInstance()?.appContext.app.config.globalProperties.__emitter__;
  emitter.on(DESC_EVENT_NAME, updateDescription.bind(this));
});
const emits = defineEmits(['desc-change']);
const slots = defineSlots();
const listeners = getListeners(getCurrentInstance()?.attrs);
const vxeTableRef = ref<VxeTableInstance>();

function updateDescription(column:VxeColumnProps, desc:string) {
  emits(DESC_EVENT_NAME, column, desc);
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