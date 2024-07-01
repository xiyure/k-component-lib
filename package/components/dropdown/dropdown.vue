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
import { DropDownProps } from './type';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KDropDown'
});

const props = withDefaults(defineProps<DropDownProps>(), {});
const kDropDownRef = ref();

function handleOpen() {
  kDropDownRef.value?.handleOpen();
}
function handleClose() {
  kDropDownRef.value?.handleClose();
}

defineExpose({ handleOpen, handleClose });

</script>

<style lang="less">
@import './style.less';
</style>