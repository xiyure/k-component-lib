<template>
  <div class="k-popover">
    <el-popover
      v-bind="attrs"
      @show="handleShow"
      @hide="handleHide"
    >
      <slot></slot>
      <template #reference> 
        <slot name="reference"></slot>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IPopoverProps } from '../../interface/index';

defineOptions({
  name: 'KPopover'
});

const props = withDefaults(defineProps<IPopoverProps>(), {
  trigger: 'hover',
  width: 150,
  placement: 'bottom',
  showArrow: true,
  hideAfter: 200,
  teleported: true,
  persistent: true,
  visible: undefined
});

const emits = defineEmits(['show', 'hide']);

const attrs = computed(() => {
  const tempObj = {} as any;
  if (props.visible !== undefined) {
    tempObj.visible = props.visible;
  }
  return Object.assign(getOriginAttrs(), tempObj);
});

const getOriginAttrs = () => ({
  trigger: props.trigger,
  title: props.title,
  content: props.content,
  width: props.width,
  placement: props.placement,
  disabled: props.disabled,
  offset: props.offset,
  transition: props.transition,
  popperOptions: props.popperOptions,
  showArrow: props.showArrow,
  popperClass: props.popperClass,
  popperStyle: props.popperStyle,
  showAfter: props.showAfter,
  hideAfter: props.hideAfter,
  autoClose: props.autoClose,
  teleported: props.teleported,
  persistent: props.persistent
});
function handleShow() {
  emits('show');
}
function handleHide() {
  emits('hide');
}
</script>

<style lang="less">
@import './style.less';
</style>