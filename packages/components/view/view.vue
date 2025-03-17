<template>
  <div ref="KViewRef" :class="['k-view', 'text-base', _styleModule]">
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
            <slot name="header">{{ t?.('view') }}</slot>
          </div>
          <span class="view-fresh" @click="handleFresh">
            <slot name="refresh"><IconRefresh /></slot>
          </span>
        </div>
        <div class="k-view__special-data">
          <el-scrollbar class="k-view-common-scrollbar">
            <template v-if="!useTree">
              <k-view-item
                v-for="item in specialData"
                :key="item[config.value]"
                :origin-data="item"
                v-bind="formatter(item)"
                @change="handleChange"
                @remove="handleRemove"
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
                  children: config.children,
                }"
                :default-expanded-keys="defaultExpandedKeys"
                :current-node-key="currentNodeKey"
                :data="data"
                :show-arrow="showArrow"
                :draggable="draggable"
                highlight-current
                v-bind="treeConfig"
                @current-change="handleChange"
                @node-expand="handleNodeExpand"
                @node-collapse="handleNodeCollapse"
                @node-drop="dragEnd"
              >
                <template v-if="$slots.label" #default="{ node, data }">
                  <slot name="label" :node="node" :data="data"></slot>
                </template>
              </k-tree>
            </template>
          </el-scrollbar>
        </div>
        <div v-if="customData?.length" class="k-view__custom-data text-base">
          <slot name="custom-header">
            <span class="custom-table-box">{{ t?.('customView') }}</span>
          </slot>
          <el-scrollbar class="k-view-custom-scrollbar">
            <template v-if="!useTree">
              <k-view-item
                v-for="item in customData"
                :key="item[config.value]"
                :origin-data="item"
                v-bind="formatter(item)"
                @change="handleChange"
                @remove="handleRemove"
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
                  children: config.children,
                }"
                :default-expanded-keys="defaultExpandedKeys"
                :current-node-key="currentNodeKey"
                :data="data"
                :draggable="draggable"
                highlight-current
                :show-arrow="showArrow"
                v-bind="treeConfig"
                @current-change="handleChange"
                @node-expand="handleNodeExpand"
                @node-collapse="handleNodeCollapse"
                @node-drop="dragEnd"
              >
                <template v-if="$slots.label" #default="{ node, data }">
                  <slot name="label" :node="node" :data="data"></slot>
                </template>
              </k-tree>
            </template>
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
import { ref, watch, computed, provide, inject, onMounted, onBeforeUnmount } from 'vue';

import { VueI18nTranslation } from 'vue-i18n';
import { ElScrollbar } from 'element-plus';
import { IconRefresh, IconArrowRight } from 'ksw-vue-icon';
import { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';
import { Sortable, SortableInstance } from '../../utils/event/sortable';
import { getElement } from '../../utils';
import KViewItem from './view_item.vue';
import { ViewProps, ViewData } from './type';
import { KTree } from '../tree';

defineOptions({
  name: 'KView'
});

const t = inject<VueI18nTranslation>('$t');

const DEFAULT_PROPS = {
  label: 'label',
  value: 'value',
  count: 'count',
  children: 'children',
  disabled: 'disabled',
  custom: 'custom'
};
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
  'node-collapse'
]);
const _styleModule = inject('_styleModule', '');
const active = ref<string | number>('');
const KViewRef = ref<HTMLDivElement>();

const config = computed(() => Object.assign(DEFAULT_PROPS, props.props ?? {}));
const specialData = computed(() => props.data?.filter((item) => !item[config.value.custom]) ?? []);
const customData = computed(() => props.data?.filter((item) => Boolean(item[config.value.custom])));

const defaultExpandedKeys = ref<(string | number)[]>([]);
const currentNodeKey = ref<string | number>('');

onMounted(() => {
  initSortable();
});
onBeforeUnmount(() => {
  sortableInstances.common?.destroy();
  sortableInstances.custom?.destroy();
});

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
  { immediate: true }
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
type SortableInstances = {
  common: SortableInstance | null;
  custom: SortableInstance | null;
}
const sortableInstances: SortableInstances = {
  common: null,
  custom: null
};
let preRow: Element | null = null;
function initSortable() {
  const commonDragElem = getElement<HTMLElement>(
    '.k-view-common-scrollbar .el-scrollbar__view',
    KViewRef.value
  );
  const customDragElem = getElement<HTMLElement>(
    '.k-view-custom-scrollbar .el-scrollbar__view',
    KViewRef.value
  );
  if (!props.draggable) {
    return;
  }
  if (commonDragElem) {
    sortableInstances.common = Sortable(commonDragElem as HTMLElement, {
      handle: '.k-view-common',
      animation: 150,
      onMove: (evt: any) => {
        preRow = evt.related;
      },
      onEnd: dragEnd
    });
  }
  if (customDragElem) {
    sortableInstances.custom = Sortable(customDragElem as HTMLElement, {
      handle: '.k-view-custom',
      animation: 150,
      onMove: (evt: any) => {
        preRow = evt.related;
      },
      onEnd: dragEnd
    });
  }
}
function dragEnd(targetNode: any, lastOverNode?: any, position?: 'after' | 'before' | 'inner') {
  const dragData = {
    targetNode,
    lastOverNode,
    position
  };
  if (!props.useTree) {
    if (!preRow || preRow === targetNode) {
      return;
    }
    const { item } = targetNode;
    const compareRes = item.compareDocumentPosition(preRow);
    if (compareRes === 2) {
      dragData.position = 'after';
    } else if (compareRes === 4) {
      dragData.position = 'before';
    }
    const preValue = preRow?.getAttribute('data-view-value');
    dragData.lastOverNode = props.data?.find((item) => item[config.value.value] === preValue);
    const value = item.getAttribute('data-view-value');
    dragData.targetNode = props.data?.find((item) => item[config.value.value] === value);
    preRow = null;
  }
  emits('drag', dragData);
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
    showCustomControl: data.showCustomControl ?? false
  };
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
