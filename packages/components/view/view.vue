<template>
  <div :class="['k-view', 'text-base', _styleModule]">
    <div
      class="k-view-nav p-2 h-full border-r border-gray-200 relative flex-shrink-0"
      :class="{ 'is-collapse': viewCollapse }"
    >
      <div
        class="showViewBtn flex justify-center items-center rounded-full"
        @click="handleViewVisible"
      >
        <IconArrowRight :class="{ 'is-collapse': !viewCollapse }" />
      </div>
      <div class="k-view-aside" :style="{ display: viewCollapse ? 'none' : 'flex' }">
        <div class="k-view__header">
          <div class="view-title text-base font-bold">
            <slot name="header">{{ $t('view') }}</slot>
          </div>
          <span class="view-fresh" @click="handleFresh">
            <slot name="refresh"><IconRefresh /></slot>
          </span>
        </div>
        <div :id="specialViewId" class="k-view__special-data">
          <el-scrollbar>
            <template v-if="!useTree">
              <k-view-item
                v-for="item in specialData"
                :key="item[config.value]"
                :origin-data="item"
                v-bind="formatter(item)"
                @change="handleChange"
                @remove="handleRemove"
                @_drag-start="onDragStart"
                @_drag-drop="onDrop"
              >
                <template v-if="$slots.label" #label>
                  <slot name="label" :data="item"></slot>
                </template>
              </k-view-item>
            </template>
            <template v-else>
              <k-tree
                ref="KViewTree"
                class="k-tree-view-item"
                :node-key="config.value"
                :props="{
                  label: config.label,
                  disabled: config.disabled,
                  children: config.children
                }"
                :default-expanded-keys="defaultExpandedKeys"
                :current-node-key="currentNodeKey"
                :data="props.data"
                :show-arrow="showArrow"
                highlight-current
                v-bind="treeConfig"
                @current-change="handleChange"
                @node-expand="handleNodeExpand"
                @node-collapse="handleNodeCollapse"
              >
                <template v-if="$slots.label" #default="{ node, data }">
                  <slot name="label" :node="node" :data="data"></slot>
                </template>
              </k-tree>
            </template>
            <div v-if="customData?.length" :id="customViewId" class="k-view__custom-data text-base">
              <slot name="custom-header">
                <span class="custom-table-box">{{ $t('customView') }}</span>
              </slot>
              <template v-if="!useTree">
                <k-view-item
                  v-for="item in customData"
                  :key="item[config.value]"
                  :origin-data="item"
                  v-bind="formatter(item)"
                  @change="handleChange"
                  @remove="handleRemove"
                  @_drag-start="onDragStart"
                  @_drag-drop="onDrop"
                >
                  <template v-if="$slots.label" #label>
                    <slot name="label" :data="item"></slot>
                  </template>
                </k-view-item>
              </template>
              <template v-else>
                <k-tree
                  ref="KCustomViewTree"
                  class="k-tree-view-item"
                  :node-key="config.value"
                  :props="{
                    label: config.label,
                    disabled: config.disabled,
                    children: config.children
                  }"
                  :default-expanded-keys="defaultExpandedKeys"
                  :current-node-key="currentNodeKey"
                  :data="props.data"
                  highlight-current
                  :show-arrow="showArrow"
                  v-bind="treeConfig"
                  @current-change="handleChange"
                  @node-expand="handleNodeExpand"
                  @node-collapse="handleNodeCollapse"
                >
                  <template v-if="$slots.label" #default="{ node, data }">
                    <slot name="label" :node="node" :data="data"></slot>
                  </template>
                </k-tree>
              </template>
            </div>
          </el-scrollbar>
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
import { ref, watch, computed, provide, inject } from 'vue';
import { IconRefresh, IconArrowRight } from 'ksw-vue-icon';
import KViewItem from './view_item.vue';
import { ViewProps, ViewData } from './type';
import { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';
import { KTree } from '../tree';
import { genRandomStr } from '../../utils';

defineOptions({
  name: 'KView',
});

const DEFAULT_PROPS = {
  label: 'label',
  value: 'value',
  count: 'count',
  children: 'children',
  disabled: 'disabled',
  custom: 'custom',
}
const props = withDefaults(defineProps<ViewProps>(), {
  draggable: false,
  collapse: false,
  showCustomControl: false,
  useTree: false,
  treeConfig: () => ({}),
  showArrow: false,
  showCount: true
});
const emits = defineEmits([
  'refresh',
  'change',
  'remove',
  'drag',
  'visible',
  'node-expand',
  'node-collapse',
]);
const _styleModule = inject('_styleModule', '');
const active = ref<string | number>('');

const config = computed(() => {
  return Object.assign(DEFAULT_PROPS, props.props ?? {});
});
const specialData = computed(() => props.data?.filter((item) => !item[config.value.custom]) ?? []);
const customData = computed(() => props.data?.filter((item) => Boolean(item[config.value.custom])));

const defaultExpandedKeys = ref<(string | number)[]>([]);
const currentNodeKey = ref<string | number>('');

watch(
  () => props.defaultActive,
  (val: string | number | undefined) => {
    let activeValue = val;
    if (!val) {
      activeValue = props.data?.[0]?.[config.value.value] ?? '';
    }
    active.value = activeValue as string;
    defaultExpandedKeys.value = [activeValue ?? ''];
    currentNodeKey.value = activeValue ?? '';
  },
  { immediate: true },
);

function handleFresh() {
  emits('refresh');
}
function handleChange(data: ViewData, node?: TreeNodeData) {
  active.value = data[config.value.value];
  emits('change', { value: active.value, data, node });
}
function handleRemove(data: ViewData) {
  emits('remove', { value: data[config.value.value], data });
}
function handleNodeExpand(data: TreeNodeData, node: TreeNodeData) {
  if (isLeafNode(node)) {
    return;
  }
  emits('node-expand', data, node);
}
function handleNodeCollapse(data: TreeNodeData, node: TreeNodeData) {
  if (isLeafNode(node)) {
    return;
  }
  emits('node-collapse', data, node);
}
function isLeafNode(node: TreeNodeData) {
  return node.isLeaf;
}
// 拖拽排序
const dragElement: {
  element: HTMLElement | null;
  data: ViewData | null;
} = {
  element: null,
  data: null,
};
let isCustom: boolean = false;
const specialViewId = genRandomStr(8);
const customViewId = genRandomStr(8);
function onDragStart(elem: HTMLElement, data: ViewData) {
  dragElement.element = elem;
  dragElement.data = data;
  isCustom = data[config.value.custom] ?? false;
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
  emits('drag', { value: dragElement.data?.[config.value.value], data: dragElement.data });
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
function formatter(data: ViewData) {
  return {
    label: data[config.value.label] ?? '',
    value: data[config.value.value] ?? '',
    count: data[config.value.count] ?? 0,
    disabled: data[config.value.disabled] ?? false,
    custom: data[config.value.custom] ?? false,
    showCustomControl: data.showCustomControl ?? false,
  }
}

provide('activeView', active);
provide('parentProps', props);

defineExpose({
  expand,
  collapse,
  toggle,
  isExpand,
  isCollapse,
});
</script>

<style lang="less">
@import './style.less';
</style>
