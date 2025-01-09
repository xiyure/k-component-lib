---
title: 自定义表格工具栏
---

# treeTable 树表格

## 自定义表格工具栏

1.表格工具栏内置了高级筛选(filter)、刷新(refresh)、搜索框(search)、表头控制器功能(transfer)，通过widgets参数进行配置，widgets数组允许写入字符串和对象类型，传入内置功能的关键字(filter、refresh、search、transfer、sizeControl)时，表示使用内置的功能组件，传入其他字符串时，则该字符串会被当做插槽名渲染，也可以传入对象自定义渲染，格式为{id：xxx, widget: () => VNode | Component }, 表格默认展示搜索框和高级筛选。

2.widgets传入空数组时或者使用show-filter:false和show-search-input:false属性时，则不展示。

<preview path="./formToolbar.vue" />

:::tip 提示
由于这个组件是基于[Vxe-Table](https://vxetable.cn/#/table/api)开发，他的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

<API src="../table.json" lang="zh"></API>