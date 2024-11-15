<!--
* @description  参数1
* @fileName  sliderButton
* @author userName
* @date 2024-11-14 18:02:09
* @version V3.0.0
!-->
<template>
  <div ref="sliderButton" class="k-slider-button p-1 rounded flex w-full h-10 bg-gray-100">
    <div
      :ref="'bbm' + index"
      v-for="(item, index) in props.items"
      @click="handleClick(item)"
      :class="{ 'is-active': active === item.name }"
      class="k-slider-button-pane w-full rounded flex justify-center items-center text-center text-gray-500 cursor-pointer relative"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { SliderButtonProps } from './type';

defineOptions({
  name: 'KSliderButton',
});

const props = withDefaults(defineProps<SliderButtonProps>(), {});

const emits = defineEmits(['change']);

const active = ref(props.active ?? props.items[0].name);
const sliderButton = ref();

// 监测窗口发生变化后
window.addEventListener('resize', getActiveItemPosition);

onMounted(() => {
  getActiveItemPosition();
});

function getActiveItemPosition() {
  const activeElement = document.querySelector('.k-slider-button-pane.is-active');
  const { width, height } = activeElement?.getBoundingClientRect() || { width: 0, height: 0 };
  let top = activeElement?.offsetTop || 0;
  let left = activeElement?.offsetLeft || 0;
  sliderButton?.value?.style.setProperty('--item-top', `${top}px`);
  sliderButton?.value?.style.setProperty('--item-left', `${left}px`);
  sliderButton?.value?.style.setProperty('--item-width', `${width}px`);
  sliderButton?.value?.style.setProperty('--item-height', `${height}px`);
}

function handleClick(item: any) {
  if (active.value !== item.name) {
    active.value = item.name;
    nextTick(() => {
      getActiveItemPosition();
      emits('change', item.name);
    });
  }
}
</script>
<style lang="less">
@import './style.less';
</style>
