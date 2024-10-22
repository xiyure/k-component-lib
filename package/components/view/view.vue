<template>
  <div :class="['k-view', 'text-base', _styleModule]">
    <div
      class="k-view-nav p-2 h-full border-r border-gray-200 relative flex-shrink-0"
      :class="{ 'is-collapse': viewCollapse }"
    >
      <div class="showViewBtn flex justify-center items-center rounded-full" @click="handleViewVisible">
        <IconArrowRight :class="{ 'is-collapse': !viewCollapse }" />
      </div>
      <div class="k-view-aside" :style="{ display: viewCollapse ? 'none' : 'block' }">
        <div class="k-view__header">
          <div class="view-title text-base font-bold">
            <slot name="header">{{ $t('view') }}</slot>
          </div>
          <span class="view-fresh" @click="handleFresh">
            <slot name="refresh"><IconRefresh /></slot>
          </span>
        </div>
        <div :id="specialViewId" class="k-view__special-data">
          <k-view-item
            v-for="item in specialData"
            :key="item.value"
            v-bind="item"
            @change="handleChange"
            @remove="handleRemove"
            @_drag-start="onDragStart"
            @_drag-drop="onDrop"
          >
            <template v-if="$slots.label" #label>
              <slot name="label" :data="item"></slot>
            </template>
          </k-view-item>
        </div>
        <div :id="customViewId" class="k-view__custom-data text-base">
          <slot name="custom-header">
            <span class="custom-table-box">{{ $t('customView') }}</span>
          </slot>
          <k-view-item
            v-for="item in customData"
            :key="item.value"
            v-bind="item"
            @change="handleChange"
            @remove="handleRemove"
            @_drag-start="onDragStart"
            @_drag-drop="onDrop"
          >
            <template v-if="$slots.label" #label>
              <slot name="label" :data="item"></slot>
            </template>
          </k-view-item>
        </div>
      </div>
    </div>
    <div class="k-view-content">
      <slot></slot>
      <slot :name="active"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, inject } from 'vue';
import { IconRefresh } from 'ksw-vue-icon';
import { ViewProps, ViewItemProps } from './type';
import { genRandomStr } from '../../utils';

defineOptions({
  name: 'KView',
});

const props = withDefaults(defineProps<ViewProps>(), {
  draggable: false,
  collapse: false
});
const emits = defineEmits(['refresh', 'change', 'remove', 'drag', 'visible']);

const _styleModule = inject('_styleModule', '');
const active = ref(props.defaultActive ?? props.data?.[0]?.value ?? '');

const specialData = computed(() => {
  return props.data?.filter((item) => !Boolean(item.custom));
});
const customData = computed(() => {
  return props.data?.filter((item) => Boolean(item.custom));
});

function handleFresh() {
  emits('refresh');
}
function handleChange(data: ViewItemProps) {
  active.value = data.value;
  emits('change', { value: data.value, data });
}
function handleRemove(data: ViewItemProps) {
  emits('remove', { value: data.value, data });
}
// 拖拽排序
const dragElement: {
  element: HTMLElement | null;
  data: ViewItemProps | null;
} = {
  element: null,
  data: null,
};
let isCustom: boolean = false;
const specialViewId = genRandomStr(8);
const customViewId = genRandomStr(8);
function onDragStart(elem: HTMLElement, data: ViewItemProps) {
  dragElement.element = elem;
  dragElement.data = data;
  isCustom = data.custom ?? false;
}
function onDrop(elem: HTMLElement) {
  if (!dragElement.element || dragElement.element === elem) {
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
  parentElem?.replaceChild(elem, dragElement.element as HTMLElement);
  parentElem?.replaceChild(dragElement.element as HTMLElement, temp);
  dragElement.element = null;
  isCustom = false;
  emits('drag', { value: dragElement.data?.value, data: dragElement.data });
  dragElement.data = null;
}
function isChildElement(parentElem: HTMLElement | null, element: HTMLElement) {
  if (!parentElem || !element) {
    return false;
  }
  return parentElem.contains(element);
}

// 控制显示
const viewCollapse = ref(props.collapse);

function handleViewVisible() {
  toggle();
  emits('visible', !viewCollapse.value);
}
function toggle() {
  viewCollapse.value = !viewCollapse.value;
}
function expand() {
  viewCollapse.value = false;
}
function collapse() {
  viewCollapse.value = true;
}
function isExpand() {
  return !viewCollapse.value;
}
function isCollapse() {
  return viewCollapse.value;
}

provide('activeView', active);
provide('parentProps', props);

defineExpose({
  expand,
  collapse,
  toggle,
  isExpand,
  isCollapse
});
</script>

<style lang="less">
@import './style.less';
</style>
