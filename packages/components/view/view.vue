<template>
  <div
    ref="KViewRef"
    class="k-view text-base"
    :style="{ height: typeof height === 'number' ? `${height}px` : height }"
  >
    <div
      class="k-view-nav relative h-full flex-shrink-0 border-gray-200"
      :class="{
        'is-collapse': viewCollapse,
        'is-simple': simple,
        'border-r': !simple,
        'p-2': !simple,
        'pr-2': simple
      }"
    >
      <div
        v-if="!simple"
        class="showViewBtn flex items-center justify-center rounded-full"
        @click="handleViewVisible"
      >
        <IconArrowRight :class="{ 'is-collapse': !viewCollapse }" />
      </div>
      <div class="k-view-aside" :style="{ display: viewCollapse ? 'none' : 'flex' }">
        <div v-if="!simple" class="k-view__header">
          <div class="view-title text-base font-bold">
            <slot name="header">{{ t?.('view.view') }}</slot>
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
                  children: config.children
                }"
                :current-node-key="active"
                :data="data"
                :draggable="draggable"
                highlight-current
                v-bind="viewTreeConfig"
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
            <span class="custom-table-box">{{ t?.('view.customView') }}</span>
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
                  children: config.children
                }"
                :current-node-key="active"
                :data="data"
                :draggable="draggable"
                highlight-current
                v-bind="viewTreeConfig"
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
    <div class="k-view-content" v-if="!simple">
      <slot></slot>
      <slot :name="active"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, provide, onMounted, onBeforeUnmount } from 'vue';
import { ElScrollbar } from 'element-plus';
import { IconRefresh, IconArrowRight } from 'ksw-vue-icon';
import { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';
import { Sortable, SortableInstance } from '../../utils/event/sortable';
import { getElement } from '../../utils';
import KViewItem from './view_item.vue';
import { useLocale, useDeprecated } from '../../hooks';
import { ViewProps, ViewData } from './type';
import { KTree } from '../tree';

defineOptions({
  name: 'KView'
});

const { t } = useLocale();

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
  showArrow: false,
  showCount: true,
  simple: false
});

useDeprecated(
  {
    scope: 'k-view',
    from: 'show-arrow',
    replacement: 'treeConfig.showArrow',
    version: '2.0.0'
  },
  computed(() => !!props.showArrow)
);

const emits = defineEmits([
  'update:modelValue',
  'refresh',
  'change',
  'remove',
  'drag',
  'visible',
  'node-expand',
  'node-collapse'
]);
const active = ref<string | number>('');
const KViewRef = ref<HTMLDivElement>();

const config = computed(() => Object.assign(DEFAULT_PROPS, props.props ?? {}));
const specialData = computed(() => props.data?.filter((item) => !item[config.value.custom]) ?? []);
const customData = computed(() => props.data?.filter((item) => Boolean(item[config.value.custom])));
const viewTreeConfig = computed(() => {
  const {
    emptyText,
    expandOnClickNode,
    checkOnClickNode,
    defaultExpandedKeys: _defaultExpandedKeys,
    accordion,
    indent,
    lazy,
    load,
    icon,
    expandIcon,
    collapseIcon,
    showArrow
  } = props.treeConfig ?? {};
  return {
    emptyText,
    expandOnClickNode,
    checkOnClickNode,
    defaultExpandedKeys: [active.value ?? '', ...(_defaultExpandedKeys ?? [])],
    accordion,
    indent,
    lazy,
    load,
    icon,
    expandIcon,
    collapseIcon,
    showArrow: showArrow ?? props.showArrow
  };
});

onMounted(() => {
  initSortable();
  if (props.modelValue === undefined) {
    active.value = props.defaultActive ?? props.data?.[0]?.[config.value.value] ?? '';
  }
});
onBeforeUnmount(() => {
  sortableInstances.common?.destroy();
  sortableInstances.custom?.destroy();
});

watch(
  () => props.modelValue,
  (newVal) => {
    if ((typeof newVal !== 'string' && typeof newVal !== 'number') || newVal === active.value) {
      return;
    }
    active.value = newVal;
  },
  { immediate: true }
);
 
function handleFresh() {
  emits('refresh');
}
function handleChange(data: ViewData, node?: TreeNodeData) {
  active.value = data[config.value.value];
  emits('update:modelValue', active.value);
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
};
const sortableInstances: SortableInstances = {
  common: null,
  custom: null
};
let preRow: Element | null = null;
function initSortable() {
  if (!props.draggable) {
    return;
  }
  const commonDragElem = getElement<HTMLElement>(
    '.k-view-common-scrollbar .el-scrollbar__view',
    KViewRef.value
  );
  const customDragElem = getElement<HTMLElement>(
    '.k-view-custom-scrollbar .el-scrollbar__view',
    KViewRef.value
  );
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
function getCurrentView() {
  return active.value;
}
function formatter(data: ViewData) {
  return {
    label: data[config.value.label] ?? '',
    value: data[config.value.value] ?? '',
    count: data[config.value.count] ?? 0,
    disabled: data[config.value.disabled] ?? false,
    custom: data[config.value.custom] ?? false,
    showCustomControl: data.showCustomControl ?? props.showCustomControl ?? false
  };
}

provide('activeView', active);
provide('parentProps', props);

defineExpose({
  expand,
  collapse,
  toggle,
  isExpand,
  isCollapse,
  getCurrentView
});
</script>

<style lang="less">
@import './style.less';
</style>
