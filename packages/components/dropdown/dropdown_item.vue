<template>
  <el-dropdown-item ref="kDropDownItemRef" class="k-dropdown-item" v-bind="$attrs">
    <slot></slot>
  </el-dropdown-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElDropdownItem } from 'element-plus';
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KDropdownItem'
});

const kDropDownItemRef = ref(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, kDropDownItemRef));
</script>

<style lang="less">
@import './style.less';
</style>