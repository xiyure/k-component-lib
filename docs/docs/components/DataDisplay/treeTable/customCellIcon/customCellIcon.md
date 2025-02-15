---
title: 单元格图标
---

# treeTable 树表格

## 单元格图标

1.单元格支持单独配置图标，需要再列配置中添加showIconcolon属性设置为true，然后才能读取行数据row中的icon属性;

2.由于业务使用文件夹图标场景较多，因此内置了folder图标，在行数据中设置folder属性为true即可展示文件夹图标，优先级高于 icon 同时支持给图标设置样式;

3.在行数据中设置iconStyle属性即可，包含color（颜色）、size（大小）、indent（图标与文字距离）、
empty（\*\*folder为true时使用，表示文件夹为空）等属性。

<demo path="./customCellIcon.vue" />

:::tip 提示
由于这个组件是基于[Vxe-Table](https://vxetable.cn/#/table/api)开发，他的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

<API src="../table.json" lang="zh"></API>