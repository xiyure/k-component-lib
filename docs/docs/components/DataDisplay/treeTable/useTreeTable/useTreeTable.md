---
title: 树形表格
---

# treeTable 树表格

<leadInto name="KTreeTable" />

::: tip 提示
1.由于`TreeTable`组件基于现有业务场景对部分`vxe-table`导出的`API`进行了修改，因此建议直接通过`ref`调用表格实例导出的`API`，而不是通过`tableInstance`对象调用；（对于`vxe-table`中未二次封装的`API`，使用`ref`实例调用同样有效）  
2.为了兼容原有项目的写法，组件库仍保留了`tableInstance`对象的有效性，此时通过`tableInstance`调用的方法为`vxe-table`底层的`API`而非组件库二次封装后的`API`；
:::

## 树形表格

1.设置参数use-tree为true时启用树形表格(传入的数据需为扁平化的树形结构数组);

2.设置参数tree-config配置树形结构，参考vxe-table实现;

3.需要再某列配置中设置treeNode属性为true，表示该列为树形结构的节点列。

<demo path="./useTreeTable.vue" />

:::tip 提示
由于这个组件是基于[Vxe-Table](https://vxetable.cn/#/table/api)开发，他的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

<API src="../table.json" lang="zh"></API>
