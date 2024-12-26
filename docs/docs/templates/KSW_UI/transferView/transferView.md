---
title: TransferView 穿梭框视图
---

# TransferView 穿梭框视图

## 基础用法

`transferView` 的数据通过 `treeTransferData` 属性传入。 数据需要是一个对象数组，每个对象有以下属性：`id` 为数据的唯一性标识，`name` 为显示文本。 使用`handleSubmit`函数可以接收选中的数据和筛选的类型。

<preview path="./def.vue" />

:::tip 提示
由于这个组件是基于k-tree-transfer，他的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

<API src="./transferView.json" lang="zh"></API>
