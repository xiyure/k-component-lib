---
title: Cascader 级联选择器
---

# Cascader 级联选择器

当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

## 基础用法

有两种触发子菜单的方式

只需为 Cascader 的options属性指定选项数组即可渲染出一个级联选择器。 通过 props.expandTrigger 属性控制子节点的展开方式

<demo path="./basic" />

## 有禁用选项

通过在数据源中设置 disabled 字段来声明该选项是禁用的

本例中，`options` 指定的数组中的第一个元素含有`disabled: true`键值对，因此是禁用的。 在默认情况下，`Cascader` 会检查数据中每一项的`disabled`字段是否为`true`，如果你的数据中表示禁用含义的字段名不为`disabled`，可以通过`props.disabled`属性来指定（详见下方 `API` 表格）。 当然，`value`、`label`和`children`这三个字段名也可以通过同样的方式指定。

<demo path="./option-disabling" />

## 可清空

通过 `clearable` 设置输入框可清空

<demo path="./clearable" />

## 仅显示最后一级

可以仅在输入框中显示选中项最后一级的标签，而不是选中项所在的完整路径。

属性`show-all-levels`定义了是否显示完整的路径， 将其赋值为 `false` 则仅显示最后一级。

<demo path="./last-level" />

## 多选

在标签中添加 `:props="props"` 并设置 `props = { multiple: true }` 来开启多选模式。

::: info 正确用法

```html
<template>
  <k-cascader :props="props" />
</template>
<script lang="ts" setup>
  const props = { multiple: true }
</script>
```
:::

::: danger 错误用法
```html
<template>
  <!--  Object literal binging here is invalid syntax for cascader  -->
  <k-cascader :props="{ multiple: true }" />
</template>
```
:::


使用多选时，所有选中的标签将默认显示。 您可以设置 `collapse = true` 将选中的标签折叠。 您可以设置 `max-collapse-tags` 来显示最大tag数量，默认1。 您可以使用 `collapse-tags-tooltip` 属性来启用鼠标悬停折叠文字以显示具体所选值的行为。

<demo path="./multiple-selection" />

## 选择任意一级选项

在单选模式下，你只能选择叶子节点；而在多选模式下，勾选父节点真正选中的都是叶子节点。 启用该功能后，可让父子节点取消关联，选择任意一级选项。

可通过 `props.checkStrictly = true` 来设置父子节点取消选中关联，从而达到选择任意一级选项的目的。

<demo path="./any-level" />

## 动态加载

当选中某一级时，动态加载该级下的选项。

通过`lazy`开启动态加载，并通过`lazyload`来设置加载数据源的方法。 `lazyload`方法有两个参数，第一个参数`node`为当前点击的节点，第二个`resolve`为数据加载完成的回调(必须调用)。 为了更准确的显示节点的状态，还可以对节点数据添加是否为叶子节点的标志位 (默认字段为`leaf`，可通过`props.leaf`修改)。 否则，将以有无子节点来判断其是否为叶子节点。

<demo path="./dynamic-loading" />

## 可搜索

可以快捷地搜索选项并选择。

通过添加`filterable`来启用过滤。 `Cascader` 会匹配所有节点的标签和它们的亲节点的标签，是否包含有输入的关键字。 你也可以用`filter-method`自定义搜索逻辑，接受一个函数，第一个参数是节点`node`，第二个参数是搜索关键词`keyword`，通过返回布尔值表示是否命中。

<demo path="./filterable" />

## 自定义节点内容

可以自定义备选项的节点内容

你可以通过 `scoped slot` 自定义节点的内容。 您可以访问 `scope` 中的 `node` 和 `data` 属性，分别表示当前节点的 `Node` 对象和当前节点的数据。

<demo path="./custom-content" />

## 级联面板

级联面板是级联选择器的核心组件，与级联选择器一样，有单选、多选、动态加载等多种功能。

和级联选择器一样，通过 `options` 来指定选项，也可通过 `props` 来设置多选、动态加载等功能，具体详情见下方API表格。

<demo path="./panel" />

## API

<API src="./cascader.json" lang="zh"></API>