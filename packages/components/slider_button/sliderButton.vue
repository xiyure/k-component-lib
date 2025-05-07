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
import { ref, computed, watch, nextTick, onMounted, inject, onBeforeUnmount } from 'vue';
import { debounce } from 'lodash';
import { useDeprecated } from '../../hooks';
import { SliderButtonProps, SliderButtonPaneProps } from './type';
import { genRandomStr } from '../../utils';

defineOptions({
  name: 'KSliderButton'
});

const elementObserver = inject<any>('__elementObserver');
const props = withDefaults(defineProps<SliderButtonProps>(), {});

useDeprecated({
  scope: 'k-slider-button',
  from: 'active',
  replacement: 'default-active',
  version: '2.0.0'
}, computed(() => !!props.active));

const emits = defineEmits(['update:modelValue', 'change']);

const active = ref((props.defaultActive || props.active) ?? props.items[0].name);
const sliderButton = ref();

const key = `_${genRandomStr(8)}`;
const element = ref();

const debouncedGetActiveItemPosition = debounce(() => {
  getActiveItemPosition();
}, 10);

onMounted(() => {
  element.value = sliderButton?.value?.querySelector('.k-slider-button-pane.is-active');
  if (element.value) {
    element.value.setAttribute('data-observer-key', key);
    elementObserver.observe(element.value, debouncedGetActiveItemPosition);
  }
});

watch(() => props.modelValue, (value) => {
  if (value) {
    active.value = value;
    getActiveItemPosition();
  }
}, { immediate: true });

async function getActiveItemPosition() {
  await nextTick();
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

async function handleClick(item: SliderButtonPaneProps) {
  if (active.value !== item.name) {
    active.value = item.name;
    await getActiveItemPosition();
    emits('update:modelValue', item.name);
    emits('change', item.name);
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
