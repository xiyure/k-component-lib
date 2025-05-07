---
title: 卡片风格切换
---

# treeTable 卡片风格切换

<leadInto name="KTreeTable" />

::: tip 提示
1.由于`TreeTable`组件基于现有业务场景对部分`vxe-table`导出的`API`进行了修改，因此建议直接通过`ref`调用表格实例导出的`API`，而不是通过`tableInstance`对象调用；（对于`vxe-table`中未二次封装的`API`，使用`ref`实例调用同样有效）  
2.为了兼容原有项目的写法，组件库仍保留了`tableInstance`对象的有效性，此时通过`tableInstance`调用的方法为`vxe-table`底层的`API`而非组件库二次封装后的`API`；
:::

## 卡片风格切换

`TreeTable`组件提供了卡片风格的切换，通过配置 `widgets：['card-switch']` 使用内置的卡片风格切换功能，实现表格/卡片风格的切换。

::: warning 注意
1.切换为卡片展示后，所有与表格相关操作的的`api` 和 `slot` 均失效（分页、搜索、高级筛选、刷新功能仍能正常使用），请使用 `card-content`、`card-header` 和 `card-footer` 插槽来控制卡片的展示内容。
2.卡片风格基于 `card` 组件实现，可通过 `props.cardOptions` 配置卡片的参数，具体请参考 `card` 组件的 [API](https://ksw.design.donxj.com/components/DataDisplay/card#card-props)。
:::

<demo path="./use_card.vue" />

:::tip 提示
由于这个组件是基于[Vxe-Table](https://vxetable.cn/#/table/api)开发，他的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

<API src="../table.json" lang="zh"></API>
