---
title: 自定义渲染
---

# treeTable 树表格

## 自定义渲染

表格通过具名插槽(插槽名为field字段)和列配置中的render函数自定义渲染单元格内容，已如下表格name和sex列为例。

<demo path="./customRender.vue" />

:::tip 提示
由于这个组件是基于[Vxe-Table](https://vxetable.cn/#/table/api)开发，他的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

<API src="../table.json" lang="zh"></API>