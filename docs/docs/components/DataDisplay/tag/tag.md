---
title: Tag 标签
---

# Tag 标签

<leadInto name="KTag" />

用于标记和选择。

## 基础用法

由 `type` 属性来选择 `tag` 的类型。 也可以通过 `color` 属性来自定义背景色。

<demo path="./def.vue" />

## 可移除标签

设置 `closable` 属性可以定义一个标签是否可移除。 它接受一个 `Boolean`。 默认的标签移除时会附带渐变动画。 如果不想使用，可以设置 `disable-transitions` 属性，它接受一个 `Boolean`，`true` 为关闭。 当 `Tag` 被移除时会触发 `close` 事件。

<demo path="./removableTag.vue" />

## 动态编辑标签

动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现。

<demo path="./dynamicEditTag.vue" />

## 不同尺寸

`Tag` 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

使用 `size` 属性来设置额外尺寸, 可选值包括 `large`, `default` 或 `small`.

<demo path="./sizeTag.vue" />

## 圆形标签

`Tag` 可以向按钮组件一样变为完全圆形。

<demo path="./prototypeTag.vue" />

## 可选中的标签

有时候因为业务需求，我们可能会需要用到类似复选框的标签，但是**按钮式的复选框**的样式又不满足需求，此时我们就可以用到 `check-tag`组件。

`check-tag` 的基础使用方法，`check-tag` 提供的 API 非常简单。

<demo path="./selectedTag.vue" />

## 自定义颜色标签

`color` 可以自定义标签的颜色，可以是十六进制颜色值，也可以是 CSS 颜色名。

<demo path="./colorTag.vue" />

## 点型标签

`point` 属性可以设置标签的形状为点型。

<demo path="./pointTag.vue" />

## API

<API src="./tag.json" lang="zh"></API>