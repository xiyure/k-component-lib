---
title: Virtualized Select 虚拟化选择器
---

# Virtualized Select 虚拟化选择器

通过拖动滑块在一个固定区间内进行选择

:::tip
在 `SSR` 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxtjs.org/)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).
:::

## 背景

在某些使用情况下，单个选择器可能最终加载数万行数据。 将这么多的数据渲染至 DOM 中可能会给浏览器带来负担，从而造成性能问题。 为了更好的用户和开发者体验，我们决定添加此组件。

## 基础用法

适用广泛的基础选择器

<preview path="./def.vue" />

## 多选

最基础的多选选择器

<preview path="./multipleSelect.vue" />

## 隐藏多余标签的多选

默认情况下选中值会以 `Tag` 的形式展现，你也可以设置`collapse-tags`属性将它们合并为一段文字。 您可以使用 `collapse-tags-tooltip` 属性来启用鼠标悬停折叠文字以显示具体所选值的行为。

<preview path="./multipleSelectCollapseTags.vue" />

## 可过滤的多选

当选项太多时，你可以使用 `filterable` 选项来启用过滤功能来找到所需的选项。

<preview path="./multipleSelectFilterable.vue" />

## 禁用选择器本身或选项

您可以选择禁用 Select 或者 Select 中的某个选项。

<preview path="./disabledSelect.vue" />

🚧 待完善