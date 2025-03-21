<template>
  <div class="custom-tree-container">
    <p>Using render-content</p>
    <k-tree
      style="max-width: 600px"
      :data="dataSource"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent"
    />
    <p>Using scoped slot</p>
    <k-tree
      style="max-width: 600px"
      :data="dataSource"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <a @click="append(data)"> Append </a>
            <a style="margin-left: 8px" @click="remove(node, data)"> Delete </a>
          </span>
        </span>
      </template>
    </k-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type Node from 'element-plus/es/components/tree/src/model/node';

interface Tree {
  id: number
  label: string
  children?: Tree[]
}
let id = 1000;

const append = (data: Tree) => {
  const newChild = { id: id++, label: 'testtest', children: [] };
  if (!data.children) {
    data.children = [];
  }
  data.children.push(newChild);
  dataSource.value = [...dataSource.value];
};

const remove = (node: Node, data: Tree) => {
  const parent = node.parent;
  const children: Tree[] = parent.data.children || parent.data;
  const index = children.findIndex((d) => d.id === data.id);
  children.splice(index, 1);
  dataSource.value = [...dataSource.value];
};

const renderContent = (
  h,
  {
    node,
    data,
    store
  }: {
    node: Node
    data: Tree
    store: Node['store']
  }
) => h(
  'span',
  {
    class: 'custom-tree-node'
  },
  h('span', null, node.label),
  h(
    'span',
    null,
    h(
      'a',
      {
        onClick: () => append(data)
      },
      'Append '
    ),
    h(
      'a',
      {
        style: 'margin-left: 8px',
        onClick: () => remove(node, data)
      },
      'Delete'
    )
  )
);

const dataSource = ref<Tree[]>([
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1'
          },
          {
            id: 10,
            label: 'Level three 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1'
      },
      {
        id: 6,
        label: 'Level two 2-2'
      }
    ]
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1'
      },
      {
        id: 8,
        label: 'Level two 3-2'
      }
    ]
  }
]);
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
