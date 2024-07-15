<template>
  <div class="k-tree">
    <div class="k-tree__filter">
      <k-input
        v-if="props.showFilter" v-model="query" :placeholder="$t('enterInputSearch')"
        @input="filterTreeNode"
        @keyup.enter="filter(query)"
      >
        <template #append>
          <k-button main @click="filter(query)"><IconSearch /></k-button>
        </template>
      </k-input>
    </div>
    <el-tree-v2 ref="KTreeRef" v-bind="$attrs" :filter-method="filterMethod">
      <template v-for="(_, name) in $slots" :key="name" #[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </el-tree-v2>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TreeNode, TreeNodeData, TreeKey, TreeData } from 'element-plus/es/components/tree-v2/src/types';
import { IconSearch } from 'ksw-vue-icon';
import { TreeProps } from './type';
import { KInput } from '../input';
import { KButton } from '../button';

defineOptions({
  name: 'KTree'
});

const props = withDefaults(defineProps<TreeProps>(), {
  showFilter: true,
  lazy: true,
  filterMethod: (query: string, node: TreeNode) => node.label?.includes(query)
});

const KTreeRef = ref();
const query = ref('');

function filterTreeNode(value: string) {
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