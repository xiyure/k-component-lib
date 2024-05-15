<template>
  <vxe-colgroup
    v-bind="props"
  >
    <slot></slot>
    <template v-if="slots.header" #header="colgroupSlotProps">
      <slot name="header" v-bind="colgroupSlotProps"></slot>
    </template>
  </vxe-colgroup>
</template>

<script setup lang="ts">
import { VxeColgroupProps } from 'vxe-table';

defineOptions({
  name: 'KColumnGroup'
});

const props = withDefaults(defineProps<VxeColgroupProps>(), {
  visible: true
});
const slots = defineSlots();
</script>

<style lang="less">
@import './style.less';
</style>