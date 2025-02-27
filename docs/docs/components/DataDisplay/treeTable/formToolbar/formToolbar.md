---
title: 自定义表格工具栏
---

# treeTable 树表格

::: tip 提示
1.由于`TreeTable`组件基于现有业务场景对部分`vxe-table`导出的`API`进行了修改，因此建议直接通过`ref`调用表格实例导出的`API`，而不是通过`tableInstance`对象调用；（对于`vxe-table`中未二次封装的`API`，使用`ref`实例调用同样有效）  
2.为了兼容原有项目的写法，组件库仍保留了`tableInstance`对象的有效性，此时通过`tableInstance`调用的方法为`vxe-table`底层的`API`而非组件库二次封装后的`API`；
:::

## 自定义表格工具栏

1.表格工具栏内置了高级筛选(filter)、刷新(refresh)、搜索框(search)、表头控制器功能(transfer)，通过widgets参数进行配置，widgets数组允许写入字符串和对象类型，传入内置功能的关键字(filter、refresh、search、transfer、sizeControl)时，表示使用内置的功能组件，传入其他字符串时，则该字符串会被当做插槽名渲染，也可以传入对象自定义渲染，格式为{id：xxx, widget: () => VNode | Component }, 表格默认展示搜索框和高级筛选。

2.widgets传入空数组时或者使用show-filter:false和show-search-input:false属性时，则不展示。

<demo path="./formToolbar.vue" />

:::tip 提示
由于这个组件是基于[Vxe-Table](https://vxetable.cn/#/table/api)开发，他的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

<API src="../table.json" lang="zh"></API>