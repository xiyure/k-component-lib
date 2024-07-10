<template>
  <el-tree-select ref="KTreeSelectRef" v-bind="$attrs" @node-click="handleNodeClick">
    <!-- <template #default="{ node, data }">
      <span class="custom-tree-node" @click="() => console.log(node, data)">
        <component :is="IconClose" v-show="!states"></component>
        <component :is="IconOpen" v-show="states"></component>
        <component :is="data.icon"></component>
        {{ data.label }}
      </span>
    </template> -->

    <template #default="{ node, data }">
      <span>
        <component :is="data.icon ?? 'IconFlowNested'" />
        {{ data.label }}
      </span>
    </template>
  </el-tree-select>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue';
import { IconFlowNested, IconFolderOpen } from 'ksw-vue-icon';
import { TreeSelectProps } from './type.d';

defineOptions({
  name: 'KTreeSelect'
});

const handleNodeClick = (data: any, node: any) => {
  console.log(data.icon);
  if (data.icon) {
    console.log('有图标');
  } else {
    console.log('没有图标');
  }
  // if (!node.expanded) {
  //   data.icon = 'IconFolderOpen';
  //   console.log('展开了');
  // } else {
  //   console.log('收起了', !data.icon);
  //   if (data.icon) {
  //     data.icon = 'IconFlowNested';
  //   } else {
  //     return;
  //   }
  // }
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
  setData
});
</script>

<style lang="less">
@import './style.less';
</style>