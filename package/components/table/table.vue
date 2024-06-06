<template>
  <div class="k-table">
    <div class="k-table__content">
      <vxe-table
        ref="vxeTableRef"
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
    </div>
  </div>
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
  emitter.on(DESC_EVENT_NAME, updateDescrition.bind(this));
});
const emits = defineEmits(['desc-change']);
const slots = defineSlots();
const listeners = getListeners(getCurrentInstance()?.attrs);
const vxeTableRef = ref<VxeTableInstance>();

function updateDescrition(column:VxeColumnProps, desc:string) {
  emits(DESC_EVENT_NAME, column, desc);
}

provide('tableInstance', vxeTableRef);

const tableInstance = computed(() => {
  return vxeTableRef.value
})
defineExpose({
  tableInstance
})
</script>

<style lang="less">
@import './style.less';
</style>