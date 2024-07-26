<template>
  <k-popover
    v-bind="$attrs"
    :popper-style="{
      color: textColor,
      backgroundColor: toolTipColor,
    }"
  >
    <slot></slot>
    <template v-if="$slots.reference" #reference>
      <slot name="reference"></slot>
    </template>
    <template v-else #reference>
      <i v-if="props.icon" class="k-tooltip-icon">
        <props.icon
          :style="{
            color: toolTipColor,
            width: iconSize,
            height: iconSize,
          }"
        />
      </i>
      <i v-else class="k-tooltip-icon">
        <IconTips
          :style="{
            color: toolTipColor,
            width: iconSize,
            height: iconSize,
          }"
        />
      </i>
    </template>
  </k-popover>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { IconTips } from 'ksw-vue-icon';
import { TooltipProps } from './type';
import { KPopover } from '../popover';
import { isValidColor } from '../../utils';

defineOptions({
  name: 'KTooltip',
});

const INNER_TYPE_COLOR = {
  normal: '#000',
  danger: '#ef4444',
  warning: '#f97316',
  primary: '#2882ff',
};
const props = withDefaults(defineProps<TooltipProps>(), {
  type: undefined,
  color: '',
  textColor: '#FFF',
  iconSize: '15px',
});

const toolTipColor = ref('#000');

watch(
  () => [props.type, props.color],
  () => {
    if (props.color && isValidColor(props.color)) {
      toolTipColor.value = props.color;
    } else if (!props.color && props.type && INNER_TYPE_COLOR[props.type]) {
      toolTipColor.value = INNER_TYPE_COLOR[props.type];
    } else {
      toolTipColor.value = '#000';
    }
  },
  { immediate: true },
);
</script>

<style>
@import './style.less';
</style>
