---
title: 高级筛选
---

# treeTable 树表格

<leadInto name="KTreeTable" />

::: tip 提示
1.由于`TreeTable`组件基于现有业务场景对部分`vxe-table`导出的`API`进行了修改，因此建议直接通过`ref`调用表格实例导出的`API`，而不是通过`tableInstance`对象调用；（对于`vxe-table`中未二次封装的`API`，使用`ref`实例调用同样有效）  
2.为了兼容原有项目的写法，组件库仍保留了`tableInstance`对象的有效性，此时通过`tableInstance`调用的方法为`vxe-table`底层的`API`而非组件库二次封装后的`API`；
:::

## 基础示例

通过`advanced-filter-config`属性配置高级筛选功能，例如可自定义筛选条件、显示内容和指定筛选列等，具体配置项请查阅API文档部分。

默认情况下，筛选功能会基于传入的表格数据进行比对，如该列数据进行了特殊处理（如插槽或自定义渲染），则可能导致显示内容与表格实际输入内容不一致，因此可以配置 `filterColumns` 属性自定义筛选列， `exclude`属则性可以指定某些列不参与筛选。

<demo path="./advancedScreening.vue" />

## 多选过滤

通过`advanced-filter-config.filterColumns` 自定义筛选列时，可以通过设置配置项的 `multiple` 属性配置多选过滤功能。可选值为 `true` 、 `select` 以及 `tree-select`。

`multiple` 为 `true` 或 `select` 时，多选时会将选项展示为下拉框

<demo path="./advanced_multiple.vue" />

`multiple` 为 `tree-select` 时，多选时会将选项展示为树形下拉框

<demo path="./advanced_multiple_tree.vue" />

:::tip 提示
由于这个组件是基于[Vxe-Table](https://vxetable.cn/#/table/api)开发，他的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

<API src="../table.json" lang="zh"></API>