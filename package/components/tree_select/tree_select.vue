<template>
  <el-tree-select ref="KTreeSelectRef" v-bind="$attrs" @node-click="handleNodeClick">
    <template #default="{ data }">
      <span>
        <component
          :is="data.icon ?? 'IconFlowNested'"
          :class="!data.children?.length ? 'tree-item-icon--noChildren' : ''"
        />
        {{ data.label }}
      </span>
    </template>
  </el-tree-select>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import type {
  TreeNode,
  TreeNodeData,
  TreeKey,
  TreeData,
} from 'element-plus/es/components/tree-v2/src/types';

defineOptions({
  name: 'KTreeSelect',
});

const handleNodeClick = async (data: any, node: any) => {
  await nextTick();
  if (node.expanded && (data.icon === 'IconFlowNested' || !data.icon)) {
    data.icon = 'IconFolderOpen';
  }
  if (!node.expanded && data.icon === 'IconFolderOpen') {
    data.icon = 'IconFlowNested';
  }
};

const KTreeSelectRef = ref();

function filter(query: string) {
  return KTreeSelectRef.value?.filter(query);
}
function getCheckedNodes(leafOnly: boolean) {
  return KTreeSelectRef.value?.getCheckedNodes(leafOnly);
}
function getCheckedKeys(leafOnly: boolean) {
  return KTreeSelectRef.value?.getCheckedKeys(leafOnly);
}
function setChecked(key: TreeKey, checked: boolean) {
  return KTreeSelectRef.value?.setChecked(key, checked);
}
function setExpandedKeys(keys: TreeKey[]) {
  return KTreeSelectRef.value?.setExpandedKeys(keys);
}
function setCheckedKeys(keys: TreeKey[]) {
  return KTreeSelectRef.value?.setCheckedKeys(keys);
}
function getHalfCheckedNodes() {
  return KTreeSelectRef.value?.getHalfCheckedNodes();
}
function getHalfCheckedKeys() {
  return KTreeSelectRef.value?.getHalfCheckedKeys();
}
function getCurrentKey() {
  return KTreeSelectRef.value?.getCurrentKey();
}
function getCurrentNode() {
  return KTreeSelectRef.value?.getCurrentNode();
}
function setCurrentKey(key: TreeKey) {
  return KTreeSelectRef.value?.setCurrentKey(key);
}
function getNode(data: TreeKey | TreeNodeData) {
  return KTreeSelectRef.value?.getNode(data);
}
function expandNode(node: TreeNode) {
  return KTreeSelectRef.value?.expandNode(node);
}
function collapseNode(node: TreeNode) {
  return KTreeSelectRef.value?.collapseNode(node);
}
function setData(data: TreeData) {
  return KTreeSelectRef.value?.setData(data);
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
  setData,
});
</script>

<style lang="less">
@import './style.less';
</style>
