<!--
* @description  参数1
* @fileName  sliderButton
* @author userName
* @date 2024-11-14 18:02:09
* @version V3.0.0
!-->
<template>
  <div ref="sliderButton" class="k-slider-button p-1 rounded-lg flex w-full bg-gray-100">
    <div
      v-for="item in props.items"
      :key="item.name"
      :class="{ 'is-active': active === item.name }"
      class="k-slider-button-pane w-full rounded flex justify-center items-center text-center text-gray-500 cursor-pointer relative"
      @click="handleClick(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, onBeforeUnmount } from 'vue';
import { SliderButtonProps, SliderButtonPaneProps } from './type';

defineOptions({
  name: 'KSliderButton'
});

const props = withDefaults(defineProps<SliderButtonProps>(), {});

const emits = defineEmits(['change']);

const active = ref(props.active ?? props.items[0].name);
const sliderButton = ref();

// 监测窗口发生变化后
window.addEventListener('resize', getActiveItemPosition);

const timer = setTimeout(() => {
  getActiveItemPosition();
}, 1000);

function getActiveItemPosition() {
  const activeElement: HTMLElement | null = sliderButton?.value?.querySelector('.k-slider-button-pane.is-active');
  const { width } = activeElement?.getBoundingClientRect() || { width: 0, height: 0 };
  const top = activeElement?.offsetTop || 0;
  const left = activeElement?.offsetLeft || 0;
  sliderButton?.value?.style.setProperty('--item-top', `${top}px`);
  sliderButton?.value?.style.setProperty('--item-left', `${left}px`);
  sliderButton?.value?.style.setProperty('--item-width', `${width}px`);
}

function handleClick(item: SliderButtonPaneProps) {
  if (active.value !== item.name) {
    active.value = item.name;
    nextTick(() => {
      getActiveItemPosition();
      emits('change', item.name);
    });
  }
}

onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>
<style lang="less">
@import './style.less';
</style>
