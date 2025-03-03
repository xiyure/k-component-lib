---
title: 单元格图标
---

# treeTable 树表格

::: tip 提示
1.由于`TreeTable`组件基于现有业务场景对部分`vxe-table`导出的`API`进行了修改，因此建议直接通过`ref`调用表格实例导出的`API`，而不是通过`tableInstance`对象调用；（对于`vxe-table`中未二次封装的`API`，使用`ref`实例调用同样有效）  
2.为了兼容原有项目的写法，组件库仍保留了`tableInstance`对象的有效性，此时通过`tableInstance`调用的方法为`vxe-table`底层的`API`而非组件库二次封装后的`API`；
:::

## 单元格图标

1.单元格支持单独配置图标，需要再列配置中添加showIcon属性设置为true，然后才能读取行数据row中的icon属性;

2.由于业务使用文件夹图标场景较多，因此内置了folder图标，在行数据中设置folder属性为true即可展示文件夹图标，优先级高于 icon 同时支持给图标设置样式;

3.在行数据中设置iconStyle属性即可，包含color（颜色）、size（大小）、indent（图标与文字距离）、
empty（`__folder`为true时使用，表示文件夹为空）等属性。

<demo path="./customCellIcon.vue" />

:::tip 提示
由于这个组件是基于[Vxe-Table](https://vxetable.cn/#/table/api)开发，他的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

<API src="../table.json" lang="zh"></API>