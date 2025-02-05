<template>
  <k-view
    default-active="free"
    :collapse="false"
    :data="viewData"
    :use-tree="true"
    :tree-config="{
      nodeKey: 'value', // 节点唯一标识
      indent: 20, // 节点缩进距离, 默认20
      icon: 'IconAdd', // 节点图标
      expandIcon: 'IconFolderOpen', // 展开图标
      collapseIcon: 'IconFolderClose', // 收起图标
      showArrow: true
    }"
    :show-arrow="false"
    @change="(value) => console.log('change', value)"
    @node-expand="(value) => console.log('node-expand', value)"
    @node-collapse="(value) => console.log('node-collapse', value)"
    @remove="(value) => console.log('remove', value)"
    @refresh="() => console.log('refresh')"
    @drag="(value) => console.log('drag', value)"
    @visible="handleVisible"
  >
    <template #all>all</template>
    <template #free>free</template>
    <template #active>active</template>
    <template #outline>outline</template>
    <template #destory>destory</template>
    <template #production1>production1</template>
    <template #production2>production2</template>
    <template #parent>parent</template>
    <template #children1>children1</template>
    <template #children2>children2</template>
    <template #children3>children3</template>
    default
  </k-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const viewData = ref([
  {
    label: '全部',
    value: 'parent',
    count: 10000,
    color: '',
    children: [
      {
        label: 'Children1',
        value: 'children1',
        count: 7750,
        children: [
          {
            label: 'Children1-1',
            value: 'children1-1',
            count: 8811
          },
          {
            label: 'Children1-2',
            value: 'children1-2',
            count: 8811
          },
          {
            label: 'Children1-3',
            value: 'children1-3',
            count: 8811
          }
        ]
      },
      {
        label: 'Children2',
        value: 'children2',
        count: 1274
      },
      {
        label: 'Children3',
        value: 'children3',
        count: 679
      },
      {
        label: 'Children4',
        value: 'children4',
        count: 297
      },
      {
        label: 'Children5',
        value: 'children5',
        count: 524
      },
      {
        label: 'Children6',
        value: 'children6',
        count: 472
      },
      {
        label: 'Children7',
        value: 'children7',
        count: 356
      }
    ]
  }
]);

function handleVisible(visible: boolean) {
  console.log('visible', visible);
}
</script>

<style lang="less" scoped>
:deep(.k-view-content) {
  margin: auto;
  font-size: 28px;
}
</style>