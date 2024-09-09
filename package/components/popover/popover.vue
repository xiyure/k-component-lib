<template>
  <el-popover
    ref="KPopoverRef"
    :class="['k-popover', $styleModule]"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElPopover } from 'element-plus';
import { handleExpose } from '../../utils';

defineOptions({
  name: 'KPopover'
});

const KPopoverRef = ref(null);
const instance: any = {};
handleExpose(instance, KPopoverRef, 'KPopover');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>