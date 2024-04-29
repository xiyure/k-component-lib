<template>
  <div class="k-popconfirm">
    <el-popconfirm
      v-bind="attrs"
      cancel-button-type="default"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @show="handleShow"
      @hide="handleHide"
    >
      <slot></slot>
      <template #reference> 
        <slot name="reference"></slot>
      </template>
    </el-popconfirm>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IconClear } from 'ksw-vue-icon';
import { IPopconfirmProps } from '../../interface/index';

defineOptions({
  name: 'KPopconfirm'
});

const props = withDefaults(defineProps<IPopconfirmProps>(), {
  trigger: 'click',
  width: 150,
  placement: 'bottom',
  showArrow: true,
  hideAfter: 200,
  teleported: true,
  persistent: true,
  visible: undefined,
  icon: IconClear,
  iconColor: 'red'
});

const emits = defineEmits(['confirm', 'cancel', 'show', 'hide']);

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
  icon: props.icon,
  iconColor: props.iconColor,
  hideIcon: props.hideIcon,
  confirmButtonText: props.confirmButtonText,
  cancelButtonText: props.cancelButtonText,
  confirmButtonType: props.confirmButtonType,
  cancelButtonType: props.cancelButtonType,
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
function handleConfirm() {
  emits('confirm');
}
function handleCancel() {
  emits('cancel');
}
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