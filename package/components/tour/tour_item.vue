<template>
  <el-tour-step
    v-bind="attrs"
    @close="handleClose"
  >
    <slot></slot>
    <template v-if="slots.header" #header>
      <slot name="header"></slot>
    </template>
  </el-tour-step>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { TourItemProps } from './type';

defineOptions({
  name: 'KTourItem'
});

const props = withDefaults(defineProps<TourItemProps>(), {
  showArrow: true,
  showClose: true,
  placement: 'bottom',
  type: 'default',
  mask: true
});

const slots = useSlots();
const emits = defineEmits(['close']);

const attrs = computed(() => ({
  target: props.target,
  showArrow: props.showArrow,
  title: props.title,
  description: props.description,
  placement: props.placement,
  contentStyle: props.contentStyle,
  mask: props.mask,
  showClose: props.showClose,
  closeIcon: props.closeIcon,
  scrollIntoViewOptions: props.scrollIntoViewOptions,
  nextButtonProps: props.nextButtonProps,
  prevButtonProps: props.prevButtonProps
}));

function handleClose() {
  emits('close');
}
</script>