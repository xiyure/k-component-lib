---
title: 树表格
---

# treeTable 树表格

## 树形表格

1.设置参数use-tree为true时启用树形表格(传入的数据需为扁平化的树形结构数组);

2.设置参数tree-config配置树形结构，参考vxe-table实现;

3.需要再某列配置中设置treeNode属性为true，表示该列为树形结构的节点列。

<preview path="./useTableFilter.vue" />

:::tip 提示
由于这个组件是基于[Vxe-Table](https://vxetable.cn/#/table/api)开发，他的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

<API src="../table.json" lang="zh"></API>