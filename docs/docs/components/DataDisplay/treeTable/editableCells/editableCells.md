---
title: 可编辑单元格
---

# treeTable 树表格

## 可编辑单元格

通过edit-config属性设置单元格可编辑，trigger属性设置触发编辑的方式，可选值有click、dblclick，默认为click，需要再列配置中设置editRender参数和renderEdit参数用于自定义配置编辑状态下所展示的内容。

<preview path="./editableCells.vue" />

:::tip 提示
由于这个组件是基于[Vxe-Table](https://vxetable.cn/#/table/api)开发，他的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

<API src="../table.json" lang="zh"></API>