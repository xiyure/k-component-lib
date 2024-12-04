---
title: 搜索功能
---

# treeTable 树表格

## 搜索功能

表格搜索功能默认使用模糊匹配，可以通过search-config属性配置，strict属性设置为true时，则使用精确匹配，如需自定义搜索方法，则使用searchMethod属性，该属性接收一个函数，函数参数为当前表格数据和搜索关键字。

<preview path="./searchFunction.vue" />

## API

<API src="../table.json" lang="zh"></API>