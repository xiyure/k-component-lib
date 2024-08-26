<template>
  <el-tooltip ref="tooltipRef" class="k-tooltip" v-bind="$attrs" :popper-style="_popperStyle">
    <slot>
      <i class="k-tooltip-icon">
        <IconTips
          :style="{
            color: fillColor,
            width: '15px',
            height: '15px',
          }"
        />
      </i>
    </slot>
    <template v-if="$slots.content" #content>
      <slot name="content"></slot>
    </template>
  </el-tooltip>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue';
import { IconTips } from 'ksw-vue-icon';
import { TooltipProps } from './type';
import { isValidColor, handleExpose } from '../../utils';

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

const tooltipRef = ref<any>(null);
const fillColor: any = ref(undefined);

const _popperStyle = computed(() => {
  const popperStyle = props.popperStyle || {};
  return {
    color: props.textColor,
    backgroundColor: fillColor.value,
    borderColor: fillColor.value,
    ...popperStyle,
  };
});

watch(
  () => [props.type, props.color],
  () => {
    if (props.color && isValidColor(props.color)) {
      fillColor.value = props.color;
    } else if (!props.color && props.type && INNER_TYPE_COLOR[props.type]) {
      fillColor.value = INNER_TYPE_COLOR[props.type];
    } else {
      fillColor.value = undefined;
    }
  },
  { immediate: true },
);

// expose instance
const instance: any = {};
handleExpose(instance, tooltipRef, 'KTooltip');
defineExpose(instance);
</script>

<style>
@import './style.less';
</style>
