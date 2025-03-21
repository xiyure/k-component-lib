<!--
* @description  参数1
* @fileName  sliderButton
* @author userName
* @date 2024-11-14 18:02:09
* @version V3.0.0
!-->
<template>
  <div ref="sliderButton" class="k-slider-button">
    <div
      v-for="item in props.items"
      :key="item.name"
      :class="{ 'is-active': active === item.name }"
      class="k-slider-button-pane"
      @click="handleClick(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted, inject, onBeforeUnmount } from 'vue';
import { debounce } from 'lodash';
import { SliderButtonProps, SliderButtonPaneProps } from './type';
import { genRandomStr } from '../../utils';

defineOptions({
  name: 'KSliderButton'
});

const props = withDefaults(defineProps<SliderButtonProps>(), {});

const emits = defineEmits(['change']);

const active = ref(props.active ?? props.items[0].name);
const sliderButton = ref();

const key = `_${genRandomStr(8)}`;

const debouncedGetActiveItemPosition = debounce(() => {
  getActiveItemPosition();
}, 10);

const element = ref();
const elementObserver = inject<any>('__elementObserver');

onMounted(() => {
  element.value = sliderButton?.value?.querySelector('.k-slider-button-pane.is-active');
  element.value.setAttribute('data-observer-key', key);
  elementObserver.observe(element.value, debouncedGetActiveItemPosition);
});

function getActiveItemPosition() {
  const activeElement: HTMLElement | null = sliderButton?.value?.querySelector(
    '.k-slider-button-pane.is-active'
  );
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
  if (element.value) {
    elementObserver?.unobserve?.(element.value);
  }
});
</script>
<style lang="less">
@import './style.less';
</style>
