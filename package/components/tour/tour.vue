<template>
  <div :style="{ display: 'none' }">
    <div id="title">
      <slot name="title"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, getCurrentInstance } from 'vue';
import { driver, Driver, DriveStep, State, Config, DriverHook, PopoverDOM } from 'driver.js';
import { TourProps } from './type';

const slots = defineSlots();
defineOptions({
  name: 'KTour'
});

const props = withDefaults(defineProps<TourProps>(), {
  allowClose: true,
  animate: true,
  allowKeyboardControl: true,
  overlayOpacity: 0.5,
  stagePadding: 10,
  stageRadius: 5,
  offset: 10,
  showProgress: true
});

const emits = defineEmits(['update:modelValue', 'close', 'next', 'previous']);

const _gloab = getCurrentInstance()?.appContext.app.config.globalProperties;

const progressText = '{{current}}/{{total}}';
const tourInstance:Driver = driver({
  steps: props.steps || [],
  allowClose: props.allowClose,
  allowKeyboardControl: props.allowKeyboardControl,
  animate: props.animate,
  overlayOpacity: props.overlayOpacity,
  overlayColor: props.overlayColor,
  stagePadding: props.stagePadding,
  stageRadius: props.stageRadius,
  disableActiveInteraction: props.disableActiveInteraction,
  popoverClass: props.popoverClass,
  popoverOffset: props.offset,
  showButtons: props.showButtons,
  disableButtons: props.disableButtons,
  showProgress: props.showProgress,
  progressText: props.progressText || progressText,
  nextBtnText: props.nextBtnText || _gloab?.$t('next'),
  prevBtnText: props.prevBtnText || _gloab?.$t('previous'),
  doneBtnText: props.doneBtnText || _gloab?.$t('finish'),
  onNextClick: handleNextClick as DriverHook,
  onPrevClick: handlePrevClick as DriverHook,
  onCloseClick: handleClose as DriverHook,
  onPopoverRender: render
});

watch(() => props.modelValue, (newValue) => {
  handleTour(newValue);
}, { immediate: true });

function handleTour(isShow: boolean) {
  if (!tourInstance) {
    return;
  }
  if (isShow) {
    tourInstance.drive();
    return;
  }
  tourInstance.destroy();
}

function render(popover: PopoverDOM, options: { state: State, config: Config}) {
  const titleElem = document.getElementById('title');
  if (!titleElem) {
    return;
  }
  const currentStepIndex = tourInstance.getActiveIndex();
  const newTitleElem = titleElem.cloneNode(true);
  popover.title.innerHTML = '';
  popover.title.appendChild(newTitleElem);
}
function handleNextClick(
  element: Element,
  steps: DriveStep,
  options:{config: Config, state: State}
) {
  tourInstance.moveNext();
  const activeIndex = tourInstance.getActiveIndex();
  emits('next', element, steps, options);
  if (activeIndex === undefined) {
    emits('update:modelValue', false);
  }
}
function handlePrevClick(
  element: Element,
  steps: DriveStep,
  options:{config: Config, state: State}
):void {
  tourInstance.movePrevious();
  emits('previous', element, steps, options);
}
function handleClose(
  element: Element,
  steps: DriveStep,
  options:{config: Config, state: State}
) {
  close();
  emits('close', element, steps, options);
  emits('update:modelValue', false);
}

function setSteps(steps: DriveStep[]) {
  tourInstance.setSteps(steps);
}
function setConfig(config?: Config) {
  tourInstance.setConfig(config);
}
function close() {
  tourInstance.destroy();
}
function moveNext() {
  tourInstance.moveNext();
}
function movePrevious() {
  tourInstance.movePrevious();
}
function getActiveIndex() {
  return tourInstance.getActiveIndex?.() || 0;
}

defineExpose({
  setSteps,
  setConfig,
  moveNext,
  movePrevious,
  getActiveIndex
});
</script>

<style lang="less">
@import './style.less';
</style>