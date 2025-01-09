<template>
  <vxe-colgroup
    v-bind="$attrs"
  >
    <slot></slot>
    <template v-if="slots.header" #header="colgroupSlotProps">
      <slot name="header" v-bind="colgroupSlotProps"></slot>
    </template>
  </vxe-colgroup>
</template>

<script setup lang="ts">
import { VxeColgroup } from 'vxe-table';

defineOptions({
  name: 'KColumnGroup'
});
const slots = defineSlots();
</script>

<style lang="less">
@import './style.less';
</style>