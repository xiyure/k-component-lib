---
title: TreeSelect 树形选择
---

# TreeSelect 树形选择

<leadInto name="KTreeSelect" />

含有下拉菜单的树形选择器，结合了 k-tree 和 k-select 两个组件的功能。

## 基础用法

树状选择器

<demo path="./def" />

## 选择任意级别

当属性`check-strictly=true`时，任何节点都可以被选择，否则只有子节点可被选择。

<demo path="./treeSelectAnyLevel" />

:::tip

当使用 show-checkbox时，由于 check-on-click-node 默认值是 false，这时候只能通过 checkbox 来选中，当然您也可以将其设置成 true，这样点击整个 node 都可以用来完成选择

:::

## 多选

通过点击或复选框选择多个选项。

<demo path="./multipleTreeSelect" />

## 禁用选项

使用 disabled 字段禁用选项。

<demo path="./disabledTreeSelect" />

## 可筛选

使用关键字筛选或自定义筛选方法。 filterMethod可以自定义数据筛选的方法， filterNodeMethod可以自定义节点数据筛选的方法。

<demo path="./siftableTreeSelect" />

## 自定义内容

自定义树节点的内容。

<demo path="./customTreeSelect" />

## 内置Icon

基于许多场景需要使用文件夹的展开、收起以及叶子节点图标，因此提供了内置文件夹图标，通过use-folder-icon属性可以开启，优先级低于props提供的icon、expandIcon、collapseIcon属性。

<demo path="./folder_icon.vue" />

## 自定义Icon

自定义树节点的Icon。

<demo path="./customIconTreeSelect" />

## 懒加载

树节点懒加载，更加适合于数据量大的列表。

<demo path="./lazyLoadingTreeSelect" />

:::tip
由于这个组件是k-tree和k-select的结合体，他们的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

<API src="./tree_select.json" lang="zh"></API>