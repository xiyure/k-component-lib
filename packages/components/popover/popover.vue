<template>
  <el-popover
    ref="KPopoverRef"
    class="k-popover"
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
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KPopover'
});

const KPopoverRef = ref(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, KPopoverRef));
</script>

<style lang="less">
@import './style.less';
</style>