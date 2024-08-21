<template>
  <el-collapse
    ref="kCollapseRef"
    class="k-collapse"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { handleExpose } from '../../utils/index';

defineOptions({
  name: 'KCollapse'
});

const kCollapseRef = ref(null);
const instance: any = {};
handleExpose(instance, kCollapseRef, 'KCollapse');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>