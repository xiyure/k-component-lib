<template>
  <el-dropdown-item ref="kDropDownItemRef" :class="[_styleModule]" v-bind="$attrs">
    <slot></slot>
  </el-dropdown-item>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { ElDropdownItem } from 'element-plus';
import { handleExpose } from '../../utils';

defineOptions({
  name: 'KDropDownItem'
});

const _styleModule = inject('_styleModule', '');
const kDropDownItemRef = ref(null);
const instance: any = {};
handleExpose(instance, kDropDownItemRef, 'KDropDownItem');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>