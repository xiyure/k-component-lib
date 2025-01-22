---
title: 表格分页
---

# treeTable 树表格

## 基础用法

<preview path="./paginationTreeTable.vue" />

## 自定义顺序与间隔

通过配置`layout`属性中`prev, pager, next, jumper, ->, total`的顺序，可以分别定义`回滚`、`分页器`、`前进`、`跳转`和`总数`的顺序

使用`->`符号来自定义分页器的间隔。

<preview path="./customOrderAndSpace.vue" />

:::tip 提示
由于这个组件是基于[Vxe-Table](https://vxetable.cn/#/table/api)开发，他的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

<API src="../table.json" lang="zh"></API>
