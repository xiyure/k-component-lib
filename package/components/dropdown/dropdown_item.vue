<template>
  <el-dropdown-item ref="kDropDownItemRef" v-bind="$attrs">
    <slot></slot>
  </el-dropdown-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElDropdownItem } from 'element-plus';
import { handleExpose } from '../../utils';

defineOptions({
  name: 'KDropDownItem'
});

const kDropDownItemRef = ref(null);
const instance: any = {};
handleExpose(instance, kDropDownItemRef, 'KDropDownItem');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>