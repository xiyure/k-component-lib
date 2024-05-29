<template>
  <div class="k-tree">
    <div class="k-tree__filter">
      <k-input v-show="props.showFilter" v-model="query" @input="filterTreeNode">
        <template #append>
          <span class="k-tree__filter-append" @click="filter(query)"><IconSearch /></span>
        </template>
      </k-input>
    </div>
    <el-tree-v2
      ref="KTreeRef"
      v-bind="attrs"
      @node-click="handleNodeClick"
      @node-contextmenu="handleNodeContextmenu"
      @check-change="handleCheckChange"
      @check="handleCheck"
      @current-change="handleCurrentChange"
      @node-expand="handleNodeExpand"
      @node-collapse="handleNodeCollapse"
    >
      <template v-if="slots.default" #default="{ node, data }">
        <slot :node="node" :data="data"></slot>
      </template>
    </el-tree-v2>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { TreeNode, TreeNodeData, TreeKey, TreeData } from 'element-plus/es/components/tree-v2/src/types';
import { IconSearch } from 'ksw-vue-icon';
import { ITreeProps } from '../../interface/index';
import { KInput } from '../input';

defineOptions({
  name: 'KTree'
});

const props = withDefaults(defineProps<ITreeProps>(), {
  highlightCurrent: true,
  expandOnClickNode: true,
  indent: 16,
  itemSize: 26,
  showCheckbox: true,
  showFilter: true,
  lazy: true,
  props: () => ({
    label: 'label',
    value: 'value',
    disabled: 'disabled',
    children: 'children'
  }),
  filterMethod: (query:string, node:TreeNode) => node.label?.includes(query)
});

const emits = defineEmits([
  'node-click',
  'node-contextmenu',
  'check-change',
  'check',
  'current-change',
  'node-expand',
  'node-collapse'
]);

const slots = defineSlots();
const KTreeRef = ref();
const query = ref('');

const attrs = computed(() => ({
  data: props.data,
  emptyText: props.emptyText,
  props: props.props,
  highlightCurrent: props.highlightCurrent,
  expandOnClickNode: props.expandOnClickNode,
  checkOnClickNode: props.checkOnClickNode,
  defaultExpandedKeys: props.defaultExpandedKeys,
  showCheckbox: props.showCheckbox,
  checkStrictly: props.checkStrictly,
  defaultCheckedKeys: props.defaultCheckedKeys,
  currentNodeKey: props.currentNodeKey,
  filterMethod: props.filterMethod,
  indent: props.indent,
  icon: props.icon,
  itemSize: props.itemSize
}));

function handleNodeClick(data: TreeNodeData, node: TreeNode, e: MouseEvent) {
  emits('node-click', data, node, e);
}
function handleNodeContextmenu(e: Event, data: TreeNodeData, node: TreeNode) {
  emits('node-contextmenu', e, data, node);
}
function handleCheckChange(data: TreeNodeData, checked: boolean) {
  emits('check-change', data, checked);
}
function handleCheck(
  data: TreeNodeData,
  info: { checkedKeys: TreeKey[],
    checkedNodes: TreeData,
    halfCheckedKeys: TreeKey[],
    halfCheckedNodes: TreeData
  }
) {
  emits('check', data, info);
}
function handleCurrentChange(data: TreeNodeData, node: TreeNode) {
  emits('current-change', data, node);
}
function handleNodeExpand(data: TreeNodeData, node: TreeNode) {
  emits('node-expand', data, node);
}
function handleNodeCollapse(data: TreeNodeData, node: TreeNode) {
  emits('node-collapse', data, node);
}
function filterTreeNode(value:string) {
  if (props.lazy) {
    return;
  }
  filter(value);
}
function filter(query: string) {
  return KTreeRef.value?.filter(query);
}
function getCheckedNodes(leafOnly: boolean) {
  return KTreeRef.value?.getCheckedNodes(leafOnly);
}
function getCheckedKeys(leafOnly: boolean) {
  return KTreeRef.value?.getCheckedKeys(leafOnly);
}
function setChecked(key: TreeKey, checked: boolean) {
  return KTreeRef.value?.setChecked(key, checked);
}
function setExpandedKeys(keys: TreeKey[]) {
  return KTreeRef.value?.setExpandedKeys(keys);
}
function setCheckedKeys(keys: TreeKey[]) {
  return KTreeRef.value?.setCheckedKeys(keys);
}
function getHalfCheckedNodes() {
  return KTreeRef.value?.getHalfCheckedNodes();
}
function getHalfCheckedKeys() {
  return KTreeRef.value?.getHalfCheckedKeys();
}
function getCurrentKey() {
  return KTreeRef.value?.getCurrentKey();
}
function getCurrentNode() {
  return KTreeRef.value?.getCurrentNode();
}
function setCurrentKey(key: TreeKey) {
  return KTreeRef.value?.setCurrentKey(key);
}
function getNode(data: TreeKey | TreeNodeData) {
  return KTreeRef.value?.getNode(data);
}
function expandNode(node: TreeNode) {
  return KTreeRef.value?.expandNode(node);
}
function collapseNode(node: TreeNode) {
  return KTreeRef.value?.collapseNode(node);
}
function setData(data: TreeData) {
  return KTreeRef.value?.setData(data);
}

defineExpose({
  filter,
  getCheckedNodes,
  getCheckedKeys,
  setChecked,
  setExpandedKeys,
  setCheckedKeys,
  getHalfCheckedKeys,
  getHalfCheckedNodes,
  getCurrentKey,
  getCurrentNode,
  setCurrentKey,
  getNode,
  expandNode,
  collapseNode,
  setData
});
</script>

<style lang="less">
@import './style.less';
</style>