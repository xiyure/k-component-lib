<template>
  <el-dropdown
    ref="kDropDownRef"
    class="k-dropdown"
    v-bind="$attrs"
    :size="getCompSize(size)"
    @command="handleComand"
    @click.native="handleClick"
    @visible-change="handleVisibleChange"
  >
    <slot name="title">
      <span class="k-dropdown-link">{{ props.title }}</span>
    </slot>
    <template v-if="slots.dropdown" #dropdown>
      <slot></slot>
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

const emits = defineEmits(['command', 'click', 'visible-change']);
const slots = defineSlots();

const kDropDownRef = ref();

function handleComand(command: string) {
  emits('command', command);
}
function handleClick() {
  emits('click');
}
function handleVisibleChange(isVisible: boolean) {
  emits('visible-change', isVisible);
}
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