---
title: treeTable 树表格
---

# treeTable 树表格

## 基础用法

<preview path="./def.vue"></preview>

## 高级筛选

通过advanced-filter-config属性配置高级筛选功能，例如可自定义筛选条件、显示内容和指定筛选列。

<preview path="./advancedScreening.vue"></preview>

## 自动生成序号

type: 'seq' 自动生成序号

<preview path="./autoGenerateIndex.vue"></preview>

## 单元格布局

通过align属性设置单元格的对齐方式，可选值有left、center、right，默认为left，也可以在列配置中设置align属性，优先级高于align属性

<preview path="./cellLayout.vue"></preview>

## 单元格图标

1.单元格支持单独配置图标，需要再列配置中添加showIconcolon属性设置为true，然后才能读取行数据row中的icon属性;

2.由于业务使用文件夹图标场景较多，因此内置了folder图标，在行数据中设置\*\*folder属性为true即可展示文件夹图标，优先级高于 icon 同时支持给图标设置样式;

3.在行数据中设置iconStyle属性即可，包含color（颜色）、size（大小）、indent（图标与文字距离）、
empty（\*\*folder为true时使用，表示文件夹为空）等属性。

<preview path="./customCellIcon.vue"></preview>

## 自定义渲染

表格通过具名插槽(插槽名为field字段)和列配置中的render函数自定义渲染单元格内容，已如下表格name和sex列为例。

<preview path="./customRender.vue"></preview>

## 可编辑单元格

通过edit-config属性设置单元格可编辑，trigger属性设置触发编辑的方式，可选值有click、dblclick，默认为click，需要再列配置中设置editRender参数和renderEdit参数用于自定义配置编辑状态下所展示的内容。

<preview path="./editableCells.vue"></preview>

## 自定义表格工具栏

1.表格工具栏内置了高级筛选(filter)、刷新(refresh)、搜索框(search)、表头控制器功能(transfer)，通过widgets参数进行配置，widgets数组允许写入字符串和对象类型，传入内置功能的关键字(filter、refresh、search、transfer)时，表示使用内置的功能组件，传入其他字符串时，则该字符串会被当做插槽名渲染，也可以传入对象自定义渲染，格式为{id：xxx, widget: () => VNode | Component }, 表格默认展示搜索框和高级筛选。

2.widgets传入空数组时或者使用show-filter:false和show-search:false属性时，则不展示。

<preview path="./formToolbar.vue"></preview>

## 多级表头

<preview path="./multiHeader.vue"></preview>

## 搜索功能

表格搜索功能默认使用模糊匹配，可以通过search-config属性配置，strict属性设置为true时，则使用精确匹配，
如需自定义搜索方法，则使用searchMethod属性，该属性接收一个函数，函数参数为当前表格数据和搜索关键字。

<preview path="./searchFunction.vue"></preview>

<API src="./data.json" lang="zh"></API>
