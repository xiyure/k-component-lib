<template>
  <el-dropdown
    ref="kDropDownRef"
    class="k-dropdown"
    v-bind="attrs"
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
import { ref, computed } from 'vue';
import { DropDownProps } from './type';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KDropDown'
});

const props = withDefaults(defineProps<DropDownProps>(), {
  role: 'menu',
  showTimeout: 150,
  hideTimeout: 150,
  hideOnClick: true,
  trigger: 'hover',
  placement: 'bottom',
  teleported: true
});

const emits = defineEmits(['command', 'click', 'visible-change']);
const slots = defineSlots();

const kDropDownRef = ref();
const attrs = computed(() => ({
  type: props.type,
  maxHeight: props.maxHeight,
  splitButton: props.splitButton,
  disabled: props.disabled,
  placement: props.placement,
  trigger: props.trigger,
  hideOnClick: props.hideOnClick,
  showTimeout: props.showTimeout,
  hideTimeout: props.hideTimeout,
  role: props.role,
  teleported: props.teleported,
  popperClass: props.popperClass,
  popperOptions: props.popperOptions,
  size: getCompSize(props.size)
}));

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