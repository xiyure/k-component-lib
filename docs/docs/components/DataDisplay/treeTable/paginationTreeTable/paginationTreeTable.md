---
title: 表格分页
---

# treeTable 树表格

## 基础用法

<preview path="./paginationTreeTable.vue" />

## 自定义顺序与间隔

通过配置`layout`属性可以自定义`prev:回滚`, `pager:分页器`, `next:前进`, `jumper:跳转`, `->:间隔`, `total:总数`的顺序

<preview path="./customOrderAndSpace.vue" />

:::tip 提示
由于这个组件是基于[Vxe-Table](https://vxetable.cn/#/table/api)开发，他的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

<API src="../table.json" lang="zh"></API>
