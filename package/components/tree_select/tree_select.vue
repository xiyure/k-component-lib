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
        <component :is="data.icon" />
        {{ data.label }}
      </span>
    </template>
  </el-tree-select>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TreeSelectProps } from './type.d';
import { IconFlowNested, IconFolderOpen } from 'ksw-vue-icon';
import { toRaw } from 'vue';



defineOptions({
  name: 'KTreeSelect'
});


const handleNodeClick = (data, node, context) => {
  if (Node.expanded) {
    console.log(`Node ${data.label} is a leaf node. 展开`);
    data.icon = IconFolderOpen;
  } else {
    console.log(`Node ${data.label} is not a leaf node. 收起`);
    data.icon = IconFlowNested;
    if (!node.expanded) {
      data.icon = IconFolderOpen;
    } else {
      data.icon = IconFlowNested;
    }
  }
};

// const myicon = ref(IconFlowNested);
const props = withDefaults(defineProps<TreeSelectProps>(), {
  icon: IconFlowNested,
});

// const IconOpen = IconFolderOpen;
// const IconClose = IconFlowNested;

// const states = ref(false)

// const handleNodeClick = (data, Node, conext) => {
//   // 获取当前节点的 class

//   // states.value = !states.value;

//   // console.log(Node.icon);
//   // console.log(Node.expanded, data);
//   // // 如果是节点展开, 更改当前节点的图标
//   // if (Node.expanded) {
//   // } else {
//   // }
// };

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