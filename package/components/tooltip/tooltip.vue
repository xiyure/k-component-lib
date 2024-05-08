<template>
  <div class="k-tooltip">
    <k-popover
      v-bind="attrs"
      :popper-style="{
        color: props.textColor,
        backgroundColor: toolTipColor
      }"
    >
      <slot></slot>
      <template #reference>
        <i
          v-if="props.icon"
          class="k-tooltip-icon"
        >
          <props.icon
            :style="{
              color: toolTipColor,
              width: iconSize,
              height: iconSize
            }"
          />
        </i>
        <i
          v-else
          class="k-tooltip-icon"
        >
          <IconTips
            :style="{
              color: toolTipColor,
              width: iconSize,
              height: iconSize
            }"
          />
        </i>
      </template>
    </k-popover>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue';
import { IconTips } from 'ksw-vue-icon';
import { ITooltipProps } from '../../interface/index';
import { KPopover } from '../popover';

defineOptions({
  name: 'KTooltip'
});

const INNER_TYPE_COLOR = {
  normal: '#000',
  danger: '#ef4444',
  warning: '#f97316',
  primary: '#2882ff'
};
const props = withDefaults(defineProps<ITooltipProps>(), {
  type: undefined,
  color: '',
  textColor: '#FFF',
  trigger: 'click',
  width: 150,
  placement: 'bottom',
  showArrow: true,
  hideAfter: 200,
  teleported: true,
  persistent: true,
  visible: undefined,
  offset: 5,
  iconSize: '15px'
});

const toolTipColor = ref('#000');

const attrs = computed(() => ({
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
}));

watch(() => [props.type, props.color], () => {
  if (props.color && isValidColor(props.color)) {
    toolTipColor.value = props.color;
  } else if (!props.color && props.type && INNER_TYPE_COLOR[props.type]) {
    toolTipColor.value = INNER_TYPE_COLOR[props.type];
  } else {
    toolTipColor.value = '#000';
  }
}, { immediate: true });

function isValidColor(strColor:string) {
  const s = new Option().style;
  s.color = strColor;
  console.log(s.color);
  
  return s.color === strColor.toLowerCase();
}

</script>

<style>
@import './style.less';
</style>