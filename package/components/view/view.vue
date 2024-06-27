<template>
  <div
    class="k-view text-base"
    :style="{
      width: props.width + (typeof props.width === 'number' ? 'px' : '')
    }"
  >
    <div class="k-view__header">
      <div class="view-title text-base font-bold">
        <slot name="header">{{ $t('view') }}</slot>
      </div>
      <span class="view-fresh" @click="handleFresh">
        <IconRefresh />
      </span>
    </div>
    <div :id="specialViewId" class="k-view__special-data">
      <slot></slot>
    </div>
    <div :id="customViewId" class="k-view__custom-data text-base">
      <span class="custom-table-box">{{ $t('customView') }}</span>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, provide, getCurrentInstance } from 'vue';
import { IconRefresh } from 'ksw-vue-icon';
import { ViewProps } from './type';
import { genRandomStr } from '../../utils';

defineOptions({
  name: 'KView'
});

const props = withDefaults(defineProps<ViewProps>(), {
  width: '200px'
});

onMounted(() => {
  const emitter = getCurrentInstance()?.appContext.app.config.globalProperties.__emitter__;
  emitter.on('change-active-view', handleChange.bind(this));
  emitter.on('remove', handleRemove.bind(this));
  emitter.on('drag-start', onDragStart.bind(this));
  emitter.on('drag-drop', onDrop.bind(this));
});
const emits = defineEmits(['refresh', 'change', 'remove', 'update:modelValue']);
const activeView = ref(props.modelValue);
const specialViewId = genRandomStr(8);
const customViewId = genRandomStr(8);

watch(() => props.modelValue, (newValue) => {
  activeView.value = newValue;
});

function handleFresh() {
  emits('refresh');
}
function handleChange(value:any) {
  emits('update:modelValue', value);
  emits('change', value);
}
function handleRemove(value:any) {
  emits('remove', value);
}
let dragElement:any = null;
let isCustom:boolean = false;
function onDragStart(elem:HTMLElement, isCustomItem:boolean) {
  dragElement = elem;
  isCustom = isCustomItem;
}
function onDrop(elem:HTMLElement) {
  if (!dragElement && dragElement === elem) {
    return;
  }
  const targetParentId = isCustom ? customViewId : specialViewId;
  const parentElem = document.getElementById(targetParentId);
  if (!isChildElement(parentElem, elem)) {
    return;
  }
  const temp = document.createElement('div');
  parentElem?.appendChild(temp);
  parentElem?.replaceChild(temp, elem);
  parentElem?.replaceChild(elem, dragElement);
  parentElem?.replaceChild(dragElement, temp);
  dragElement = null;
  isCustom = false;
}
function isChildElement(parentElem:HTMLElement | null, element:HTMLElement) {
  if (!parentElem || !element) {
    return false;
  }
  return parentElem.contains(element);
}

provide('activeView', activeView);
</script>

<style lang="less">
@import './style.less';
</style>