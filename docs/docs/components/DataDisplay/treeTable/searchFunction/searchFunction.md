---
title: 搜索功能
---

# treeTable 树表格

::: tip 提示
1.由于`TreeTable`组件基于现有业务场景对部分`vxe-table`导出的`API`进行了修改，因此建议直接通过`ref`调用表格实例导出的`API`，而不是通过`tableInstance`对象调用；（对于`vxe-table`中未二次封装的`API`，使用`ref`实例调用同样有效）  
2.为了兼容原有项目的写法，组件库仍保留了`tableInstance`对象的有效性，此时通过`tableInstance`调用的方法为`vxe-table`底层的`API`而非组件库二次封装后的`API`；
:::

## 搜索功能

表格搜索功能默认使用模糊匹配，可以通过search-config属性配置，strict属性设置为true时，则使用精确匹配，如需自定义搜索方法，则使用searchMethod属性，该属性接收一个函数，函数参数为当前表格数据和搜索关键字。

<demo path="./searchFunction.vue" />

:::tip 提示
由于这个组件是基于[Vxe-Table](https://vxetable.cn/#/table/api)开发，他的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

<API src="../table.json" lang="zh"></API>