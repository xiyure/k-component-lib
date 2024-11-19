<template>
  <el-dropdown-item ref="kDropDownItemRef" :class="[_styleModule]" v-bind="$attrs">
    <slot></slot>
  </el-dropdown-item>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { ElDropdownItem } from 'element-plus';
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KDropdownItem'
});

const _styleModule = inject('_styleModule', '');
const kDropDownItemRef = ref(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, kDropDownItemRef));
</script>

<style lang="less">
@import './style.less';
</style>