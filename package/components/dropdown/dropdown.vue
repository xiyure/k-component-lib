<template>
  <el-dropdown
    ref="kDropDownRef"
    class="k-dropdown"
    v-bind="$attrs"
    :size="getCompSize(size)"
  >
    <slot name="title">
      <span class="k-dropdown-link">{{ props.title }}</span>
    </slot>
    <template #dropdown>
      <el-dropdown-menu>
        <slot></slot>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElDropdown } from 'element-plus';
import { DropDownProps } from './type';
import { getCompSize, handleExpose } from '../../utils';

defineOptions({
  name: 'KDropdown'
});

const props = withDefaults(defineProps<DropDownProps>(), {});
const kDropDownRef = ref();

const instance: any = {};
handleExpose(instance, kDropDownRef, 'KDropdown');
defineExpose(instance);

</script>

<style lang="less">
@import './style.less';
</style>