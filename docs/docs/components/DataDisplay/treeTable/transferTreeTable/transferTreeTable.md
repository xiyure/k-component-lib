---
title: 列头控制器
---

# treeTable 树表格

## 列头控制器

1.表格工具栏内置了列头控制器功能(transfer)，通过widgets参数进行配置，widgets数组允许写入字符串和对象类型，传入内置功能的关键字(transfer)时，表示使用内置的列头控制器功能组件，传入其他字符串时，则该字符串会被当做插槽名渲染，也可以传入对象自定义渲染，格式为{id：xxx, widget: () => VNode | Component }, 表格默认展示搜索框和高级筛选。

2.column数组中的每一项都可以配置visible属性进行隐藏，默认情况下所有列都显示。

<preview path="./transferTreeTable.vue" />

:::tip 提示
由于这个组件是基于[Vxe-Table](https://vxetable.cn/#/table/api)开发，他的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

<API src="../table.json" lang="zh"></API>