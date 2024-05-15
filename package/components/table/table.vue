<template>
  <div class="k-table">
    <div class="k-table__content">
      <vxe-table
        ref="vxeTableRef"
        v-bind="props"
      >
        <slot></slot>
        <template #loading>
          <slot name="loading"></slot>
        </template>
        <template #empty>
          <slot name="empty"></slot>
        </template>
      </vxe-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, getCurrentInstance } from 'vue';
import { VxeTableProps, VxeColumnProps } from 'vxe-table';

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

const vxeTableRef = ref(null);

function updateDescrition(column:VxeColumnProps, desc:string) {
  emits(DESC_EVENT_NAME, column, desc);
}

provide('tableInstance', vxeTableRef);
provide('tableConfig', { ...props });

defineExpose({
  tableInstance: vxeTableRef
});
</script>

<style lang="less">
@import './style.less';
</style>